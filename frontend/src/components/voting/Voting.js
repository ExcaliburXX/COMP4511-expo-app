import React, { useEffect, useState, Component, createRef, useRef } from 'react';
import { View, Text, TouchableOpacity, Button, ActivityIndicator, FlatList, Image, Modal, ImageBackground } from "react-native";
import { navbarOptions } from '../Nav/NavbarOptions';
import { createStackNavigator } from '@react-navigation/stack';
import Swiper from 'react-native-deck-swiper';
import Icon from 'react-native-vector-icons/AntDesign';
import { Transitioning, Transition } from 'react-native-reanimated';

import styles from './style';
import defaultCardImg from '../../assets/images/deckPic.png';
import background from '../../assets/images/background.png';
import { set } from 'lodash';

const colors = {
  red: '#ec2379',
  blue: '#0070ff',
  green: '#66ff00',
  gray: '#777777',
  black: '#000000',
  white: '#ffffff',
}

const ANIMATION_DURATION = 200;
const transition = (
  <Transition.Sequence>
    <Transition.Out type='slide-bottom' durationMs={ANIMATION_DURATION} interpolation='easeIn' />
    <Transition.Together>
      <Transition.In type='fade' durationMs={ANIMATION_DURATION} delayMs={ANIMATION_DURATION/2} />
      <Transition.In type='slide-bottom' durationMs={ANIMATION_DURATION} delayMs={ANIMATION_DURATION/2} interpolation='easeOut' />
    </Transition.Together>
  </Transition.Sequence>
)
 

const swiperRef =  createRef();
const transitionRef = createRef(); 

const Stack = createStackNavigator();

const API_URL = "http://54.252.181.63";

const Card = ({card, index}) => (
    <View style={styles.card}>
      <Text style={styles.heading}>{card.id}</Text>
      <Image source={defaultCardImg} style={styles.cardImage}/>
      <Text style={styles.description}>{card.description}</Text>
    </View>
);


export default function Voting({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [startVoting, setStartVoting] = useState(false);
  const [voteString, setVoteString] = useState('');
  const [index, setIndex] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [missingUserVotes, setMissingUserVotes] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const { groupId, deckId } = route.params;


  useEffect(() => {
    setIsLoading(true);
    fetchVotingData();
  }, []);


  useEffect(() => {
    if (index === cards.length && cards.length !== 0) {
      setHasVoted(true);
    }
  }, [index]);

  const fetchVotingData = async () => {
    
    const getRequestOptions = {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    };

    // get groups then get decks, then filter deck id
    const url = `${API_URL}/group/${groupId}`;
    const response = await fetch(url, getRequestOptions);

    const body = await response.json();
    const decks = body.decks; 

    const deck = decks.find(deck => (deck.id === deckId));

    const users = convertStringToArray(deck.user_ids);
    const usersVoted = convertStringToArray(deck.voted_ids);
    
    const _hasVoted = usersVoted.includes(global.username);
    if (_hasVoted) {
      setHasVoted(true);
    }

    const _missingUserVotes = users.length - usersVoted.length;
    setMissingUserVotes(_missingUserVotes);

    const fetchedCards = deck.cards;

    setCards(fetchedCards);
    setIsLoading(false);

    if (!hasVoted && index < cards.length){
      setModalVisible(true);
    };

  };


  const convertStringToArray = (stringToConvert) => {
    // if no ids in string (eg. stringToConvert is []), then return empty array
    if (stringToConvert === '[]') {
      return [];
    }

    const regex = new RegExp('\\[|\'|\\]| ', 'gi');
    const filteredString = stringToConvert.replace(regex, '');
    const arr = filteredString.split(',');

    return arr;
  }
  
  const handleViewWinningSuggestion = () => {
    navigation.navigate('FinalResult', { deckId, groupId });
  
  };

  const handleViewVoteStats = () => {
    navigation.navigate('FinalStatistics', { deckId, groupId });
  };
  

  const submitVotes = async () => {
    if (hasVoted || voteString.length === 0 || voteString.length !== cards.length) {
      return;
    }

    const postRequestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: global.username,
        vote_string: voteString,
        did: deckId,
        gid: groupId
      })
    };

    // get groups then get decks, then filter deck id
    const url = `${API_URL}/group/${groupId}/deck/${deckId}/vote`;
    const response = await fetch(url, postRequestOptions);

    // TODO: add error checking for failed response

    const body = await response.json();

    // current user has successfully voted so subtract by 1
    setMissingUserVotes(missingUserVotes - 1);
  };


  const handleReturnToDecks = () => {
    navigation.navigate("Decks");
  };

  const onSwiped = () => {
    setIndex(index + 1);
  };


  const renderSwipeContainer = () => {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <TouchableOpacity style ={{paddingTop: 10}} onPress={() => setModalVisible(true)}>
            <Image source={require('../../assets/images/infoIcon.png')} style={{width: 30, height: 30}} />
          </TouchableOpacity>
        </View>
        <View style={styles.swiperContainer}>
          <Swiper
            ref={swiperRef} 
            cards={cards} 
            cardIndex={index} 
            renderCard={(card) => <Card card={card} index={index}/>} 
            onSwiped={onSwiped}
            onSwipedLeft={() => setVoteString(voteString + '0')}
            onSwipedRight={() => setVoteString(voteString + '1')}
            disableTopSwipe
            disableBottomSwipe
            animateOverlayLabelsOpacity
            animateCardOpacity
            backgroundColor={'transparent'}
            infinite
            overlayLabels={{
              left: {
                title: 'NOPE',
                style: {
                  label: {
                    backgroundColor: colors.red,
                    color: colors.white,
                    fontSize: 24
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 20,
                    marginLeft: -20
                  }
                }
              },
              right: {
                title: 'LIKE',
                style: {
                  label: {
                    backgroundColor: colors.green,
                    color: colors.white,
                    fontSize: 24
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 20,
                    marginLeft: 20
                  }
                }
              },
            }}
          />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomButtonsContainer}>
            <Icon.Button
              name='close'
              size={94}
              backgroundColor='transparent'
              underlayColor='transparent'
              activeOpacity={.3}
              color={colors.red}
              onPress={() => swiperRef.current.swipeLeft()}
              style={styles.nopeButton}
            />
            <Icon.Button
              name='check'
              size={94}
              backgroundColor='transparent'
              underlayColor='transparent'
              activeOpacity={.3}
              color={colors.green}
              onPress={() => swiperRef.current.swipeRight()}
              style={styles.likeButton}
            />
          </View>
        </View>
      </View>
    );
  }

  const renderFinishContainer = () => {
    return (
      <View style={styles.finishContainer}>
        <Text style={styles.finishText}>You have finished voting!</Text>
        { (missingUserVotes > 0) ? renderIncompleteVoting(): renderCompletedVotingButtons() }
      </View>
    );
  }

  const renderIncompleteVoting = () => {
    const userPhrase = ((missingUserVotes === 1) ? "user has" : "users have");

    return (
      <View style={styles.incompleteVotingContainer}>
        <Text style={styles.incompleteVotingText}>{missingUserVotes} {userPhrase} not voted yet. {"\n\n"}Return to the {deckId} page later to check final results!</Text>
        <TouchableOpacity onPress={handleReturnToDecks} style={styles.returnToDecksButton}>
          <Text style={styles.returnToDecksText}>Return to Decks page</Text>
        </TouchableOpacity>
      </View>
    )
  };

  const renderCompletedVotingButtons = () => {
    return (
      <View style={styles.completedVotingContainer}>
        <Text style={styles.completedVotingText}>Votes are in! {"\n\n"} You can view the winner and all results via the buttons below. </Text>
        <TouchableOpacity onPress={handleViewWinningSuggestion} style={styles.viewResultsButton}> 
          <Text style={styles.viewSuggestionText}>View winning suggestion</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderLoadingScreen = () => {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator color="#ffffff" size="large" />
      </View>
    );
  }; 

  const renderContent = () => {
    if (isLoading) {
      // (hasn't been loaded yet) - show empty screen with loading indicator
      return renderLoadingScreen();
    }
    else if (!hasVoted && index < cards.length) {
      return renderSwipeContainer();
    }
    else if (hasVoted || index === cards.length) {
      if (!hasVoted && index === cards.length) {// has just finished voting
        submitVotes();
      } 
      return renderFinishContainer();
    }
  }

  const renderModal1 = () => {
    return(
    <Modal transparent={true} visible={modalVisible}>
      <View style={styles.introModalContainer}>
        <View style={styles.modalBox} opacity={0.99}>
          <Text style={[styles.modalText, {paddingTop: 10}]}> Welcome to the Voting screen! This is where you will start making your decisions</Text>
          <Text style={[styles.modalText, {paddingTop: 10}]}> You can swipe right on a suggestion if you like it, and swipe left if you dont </Text>
          <Text style={[styles.modalText, {paddingTop: 10}]}> You can also use the 'tick' and 'cross' buttons to make your choice </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingTop:20}}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={{textAlign: 'center'}}>Start Voting!</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>   
    </Modal>
    )

  }

  return (
    <ImageBackground source={background} style={[ styles.background, styles.container ]}>
      {renderModal1()}
      {renderContent()}
    </ImageBackground>
  );
}