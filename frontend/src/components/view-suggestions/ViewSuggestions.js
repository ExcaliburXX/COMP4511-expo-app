import React, { useState, useEffect, Component } from 'react';
import { View, Text, FlatList, Image, ImageBackground, ActivityIndicator } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/native';
import background from '../../assets/images/background.png';
import styles from './style';
import cardImg from '../../assets/images/deckPic.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const API_URL = "http://54.252.181.63";

export default function ViewSuggestions({ route, navigation }) {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { deckId, groupId } = route.params;

  const isFocused = useIsFocused();
  
  useEffect(() => {
    setIsLoading(true);
    fetchSuggestions();
  }, [isFocused]);

  const fetchSuggestions = async () => {
    // get cards for deck again
    const url = `${API_URL}/group/${groupId}`;
    const res = await fetch(url);

    const body = await res.json();
    const deck = body.decks.find(d => (d.id === deckId));

    setCards(deck.cards);
    setIsLoading(false);
  };

  const _renderItem = ({ item }) => (
    <View
      style={styles.cardContainerButton}
    >
      <Image source={cardImg} style={styles.cardImg} />
      <View style={styles.cardTexts}>
        <Text style={styles.cardTitle}> {item.id} </Text>
        <Text style={{ marginTop: 10 }}> {item.description} </Text>
      </View>
    </View>
  );

  const renderSuggestions = () => {
    return (
      <View style={styles.cardsContainer}>
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id}
          renderItem={_renderItem}
        ></FlatList>
      </View>
    );
  };

  const renderNoCardsText = () => {
    return (
      <View>
        <Text style={{textAlign: 'center', paddingTop: 100, color: 'white', fontSize: 20 }}>No suggestions in this deck yet</Text>
        <TouchableOpacity style={styles.addSuggestionButton} onPress={() => navigation.navigate("AddSuggestion", { deckId, groupId })}>
          <Text style={styles.addSuggestionText}>Add a suggestion</Text>
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
      return renderLoadingScreen();
    }
    else if (cards.length === 0) {
      return renderNoCardsText();
    }
    else 
    { 
      return renderSuggestions(); 
    }
  };

  return (
    <ImageBackground source={background} style={styles.container}>
      {renderContent()}
    </ImageBackground>
  );
};