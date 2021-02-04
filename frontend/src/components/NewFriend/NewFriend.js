import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, TextInput} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import _ from 'lodash'

import styles from './style';
import SendNotification from '../Nav/Notification.js'
import Toast from 'react-native-simple-toast';
 

export default function NewFriend({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFiltered] = useState([]);
  const [added, setAdded] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  
  useEffect(() => { 
  
  async function getUsers(){
    var url = 'http://54.252.181.63/users'
    return await fetch(url)
    .then((response) => response.json())
  }

  async function getUser(){
    var url = 'http://54.252.181.63/user/' + global.username
    return await fetch(url)
      .then((response) => response.json())
  }

  async function getUsersandFriends(){
    return await Promise.all([getUsers(), getUser()])
  }
  
  // When this Promise resolves, both values will be available.
  getUsersandFriends()
    .then(([users, user]) => {
      // both have loaded!
      setDataFunction(user, users);

  })
  }, [refresh]);
  
  function setDataFunction(user,json){
    setFriendData(user.want_friend_ids);
    var temp = json.map((item) => item.id);
    temp = temp.filter(x => x != global.username).filter(x => !user.friend_ids.includes(x));
    setData(temp);
    setFiltered(temp);
  }

  function setName(text){
    global.groupName = text;
  }

  const renderHeader = () => (
      <View style={styles.search}>
          <TextInput
              placeholder='Search'
              textStyle={{ color: '#000' }}
              maxLength={40}
              style={styles.searchText}
              onChangeText={text => searchFunction(text)}
              defaultValue=''
              
          />
      </View>
  )
    
  function searchFunction(text) {
      if (text == ''){
          setFiltered(data);
      }else{
          const result = data;
          setFiltered(result.filter(word => word.toLowerCase().includes(text.toLowerCase())));
      }
  }

  const _renderItem = ({ item }) => (
      <View style={{flexDirection: 'row', flex: 1, margin: 5, paddingTop: 10}}>
          <Image source={require('../../assets/images/friendPic.png')} style={styles.imageSmall} />
          { friendData.includes(item) ? <Text style={[styles.buttonText, {color: 'red'}]}>{item} (Pending Friend Request)</Text> :
          <TouchableOpacity onPress={() => handleAddFriend(item)} style={[styles.button], {flexDirection: 'row'}} name={item}>
              <View style={{width: 220}}>
                <Text style={styles.buttonText}> {item} </Text>
              </View>  
              <Image source={require('../../assets/images/addFriend.png')} style={[styles.imageSmall], {width: 32, height: 32}} />
          </TouchableOpacity>
          }
      </View>   
  );

  function handleAddFriend(name){
    fetch("http://54.252.181.63/user/" + global.username + "/friend_request?friend_id=" + name, {
          method: 'POST',
    }).then((response) => response.json())
    .catch((error) => console.error(error));
    
    var temp = data;
    setData(temp.filter((x) => x != name));
    setFiltered(temp.filter((x) => x != name));
    Toast.show("Sent friend request to " + name);
    SendNotification(name, "Friend", "");
    setRefresh(!refresh);
  }
    
  return (
      <View style={styles.container}>
          <View style = {styles.searchContainer}>
              <Text style={styles.memberText}> Add Friends </Text>
              <View style={styles.buttonContainer}>
                  {renderHeader()}
                  <FlatList contentContainerStyle={{flexGrow: 1}} data={filteredData} keyExtractor={item => item} renderItem={_renderItem}></FlatList>
              </View>
          </View>
          <FloatingAction
            showBackground={false}
            floatingIcon={require('../../assets/images/right-arrow.png')}
            iconWidth={20}
            iconHeight={20}
            onPressMain={() => navigation.navigate('FriendsNav', {newFriend: true})}
          />
      </View>
  );
  }
