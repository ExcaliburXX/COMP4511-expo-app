import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, TextInput} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import _ from 'lodash'

import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SendNotification from '../Nav/Notification.js';
import Toast from 'react-native-simple-toast';

export default function NewMemberGroup({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFiltered] = useState([]);
  const [added, setAdded] = useState([]);
  const [memberData, setMemberData] = useState([]);

  const groupName = route.params.groupName;
  
  useEffect(() => { 
  
  function getGroupMembers(){
    var url = 'http://54.252.181.63/group/' + groupName
    return fetch(url)
    .then((response) => response.json())
  }

  function getFriends(){
    var url = 'http://54.252.181.63/user/' + global.username
    return fetch(url)
      .then((response) => response.json())
  }

  function getUsersandFriends(){
    return Promise.all([getGroupMembers(), getFriends()])
  }
  
  // When this Promise resolves, both values will be available.
  getUsersandFriends()
    .then(([group, friends]) => {
      // both have loaded!
      setDataFunction(friends.friend_ids, group);
  })
  }, []);

  function setDataFunction(json, json2){
    let temp = json;
    temp = temp.filter(value => !json2.user_ids.includes(value));
    temp = temp.filter(value => !json2.invited_ids.includes(value));
    setData(temp);
    setFiltered(temp);
  }

  function setName(text){
    global.groupName = text;
  }

  const renderHeader = (
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
          <TouchableOpacity onPress={() => handleAddMember(item)} style={[styles.button], {flexDirection: 'row'}} name={item}>
              <View style={{width: 220}}>
                <Text style={styles.buttonText}> {item} </Text>
              </View>  
              <Image source={require('../../assets/images/addFriend.png')} style={[styles.imageSmall], {width: 32, height: 32}} />
          </TouchableOpacity>
      </View>   
  );

  const handleAddMember = (name) => {
    SendNotification(name, "Group", groupName);
    Toast.show("Invited " + name + " to group");
    fetch("http://54.252.181.63/group/" + groupName + "/invite?user_id=" + name, {
          method: 'POST',
    })

    var temp = data;
    var tempIndex = temp.indexOf(name);
    setData(temp.splice(tempIndex, 1));
    
  }
  
  return (
      <View style={styles.container}>
          <View style = {styles.searchContainer}>
              <Text style={styles.memberText}> Add Friends </Text>
              <View style={styles.buttonContainer}>
                  { data.length ? 
                  <FlatList ListHeaderComponent={renderHeader} contentContainerStyle={{flexGrow: 1}} data={filteredData} keyExtractor={item => item} renderItem={_renderItem}></FlatList>
                    : <Text>You don't have any friends that are not already invited to this group</Text>
                  } 
                </View>
          </View>
          <FloatingAction
            showBackground={false}
            floatingIcon={require('../../assets/images/right-arrow.png')}
            iconWidth={20}
            iconHeight={20}
            onPressMain={() => navigation.navigate('groupPage', {newMember: true})}
          />
      </View>
  );
}
