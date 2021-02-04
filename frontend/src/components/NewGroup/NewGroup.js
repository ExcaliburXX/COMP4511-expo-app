import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, TextInput} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import _ from 'lodash'
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SendNotification from '../Nav/Notification.js';
import Toast from 'react-native-simple-toast';

export default function Group({ route, navigation }) {
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFiltered] = useState([]);
  const [refresh, setLastRefresh] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [groups, setGroups] = useState([]);
  const [members, setAddedMembers] = useState([]);
  const [hasCreatedGroup, setHasCreatedGroup] = useState(false);
  useEffect(() => { 
  
    function getGroups(){
      var url = 'http://54.252.181.63/groups'
      return fetch(url)
      .then((response) => response.json())
    }
  
    function getUser(){
      var url = 'http://54.252.181.63/user/' + global.username
      return fetch(url)
        .then((response) => response.json())
    }
  
   
    function getUsersandFriends(){
      return Promise.all([getUser(), getGroups()])
    }
    
    // When this Promise resolves, both values will be available.
    getUsersandFriends()
      .then(([user, groups]) => {
        // both have loaded!
        setData(user.friend_ids);
        setFiltered(user.friend_ids);
        setGroups(groups.map((x) => x.id));
  
    })
    }, []);
  
  function setName(text){
    global.groupName = text;
  }

  const renderGroupInput = ( 
    <View style={styles.textInput}>
      <TextInput
          placeholder='Group Name'
          textStyle={{ color: '#000' }}
          maxLength={40}
          style={styles.inputText}
          onChangeText={text => setName(text)}
          defaultValue=''
          textAlign={'center'}
      />
    </View>
  )

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

    async function inviteMember(name){
      if(validated()){
        temp = data;
        setData(temp.filter((x) => x != name));
        setFiltered(temp.filter((x) => x != name));
        if(!hasCreatedGroup){
          await fetch("http://54.252.181.63/groups?id=" + global.groupName + "&owner_id=" + global.username, {
            method: 'POST',
          }).catch((error) => console.error(error));
          setHasCreatedGroup(true);
        }


        await fetch("http://54.252.181.63/group/" + global.groupName + "/invite?user_id=" + name, {
        method: 'POST',
        }).then((response) => response.json())
          .catch((error) => console.error(error));
        
        setIsError(false);
        setInvalidName(false);
        Toast.show('Invited ' + name + ' to group');
        SendNotification(name, "Group", global.groupName);
      }else{
        setInvalidName(true);
      }
    }

    const _renderItem = ({ item }) => (
        <View style={{flexDirection: 'row', margin: 5, paddingTop: 10}}>
            <Image source={require('../../assets/images/friendPic.png')} style={styles.imageSmall} />
            <TouchableOpacity style={[styles.button], {flexDirection: 'row'}} name={item} onPress={() => inviteMember(item)}>
                <View style={{width: 220}}>
                  <Text style={styles.buttonText}> {item} </Text>
                </View>  
                <Image source={require('../../assets/images/addUser.png')} style={[styles.imageSmall], {width: 40, height: 40}} />
            </TouchableOpacity>
        </View>
    );

    function validated() {
      if (global.groupName == ""){
        setInvalidName(true);
        setIsError(false);
        return false;
      }
      if (groups.includes(global.groupName)){
        setIsError(true);
        setInvalidName(false);
        return false;
      }
      return true;
    }

    async function handleConfirm() {
        if (validated()){      
          setInvalidName(false);
          setIsError(false);
          if(!hasCreatedGroup){
            await fetch("http://54.252.181.63/groups?id=" + global.groupName + "&owner_id=" + global.username, {
              method: 'POST',
            }).catch((error) => console.error(error));
            setHasCreatedGroup(true);
          }
          navigation.navigate('GroupsNav', {newGroup: true});
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/camera.png')} style={styles.image} />
            {renderGroupInput}
            { invalidName && <Text style={{paddingBottom: 20, color:'white', fontWeight: 'bold'}}> Group Name must not be empty</Text>}
            { isError && <Text style={{paddingBottom: 20, color:'white', fontWeight: 'bold'}}> Group Name is already in use</Text>}
            <View style = {styles.searchContainer}>
                <Text style={styles.memberText}> Add Members </Text>
                <View style={styles.buttonContainer}>
                    { filteredData.length ? <FlatList ListHeaderComponent={renderHeader} data={filteredData} keyExtractor={item => item} renderItem={_renderItem}></FlatList>
                    : 
                    <View style={{alignItems: 'center'}}>
                       <Text style={{textAlign: 'center', paddingTop: 30, paddingBottom: 30}}>No friends to add to group</Text>
                          <TouchableOpacity style={{backgroundColor: 'orange', alignItems: 'center', borderRadius: 20, height: 50, justifyContent: 'center',width: 100}} onPress={() => navigation.navigate('Friends')}>
                              <Text style={{fontWeight: 'bold', textAlign: 'center'}}> Go to friends</Text>
                          </TouchableOpacity>
                    </View>
                     }
                </View>
            </View>
            <FloatingAction
              showBackground={false}
              floatingIcon={require('../../assets/images/right-arrow.png')}
              iconWidth={20}
              iconHeight={20}
              onPressMain={() => handleConfirm()}
            />
        </View>
    );
  }
