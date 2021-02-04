import React, { useState, Component, useEffect } from 'react';

export default function SendNotification(name, category, group){
   
    var url = 'http://54.252.181.63/user/' + name
    fetch(url)
    .then((response) => response.json())
    .then((json) => setData(json.notifs))
    .catch((error) => console.error(error))
 
    function setData(notifs){
        everything(notifs);
    };

    function convertToPlus(string){
        return(string.split(' ').join('%'));

    }
    function everything(tempNotifs){
        var id = 0;
        if (tempNotifs.length){
            id = tempNotifs[tempNotifs.length - 1].id + 1;
        }
        
        if (category == "Friend"){
            const message = "You have a friend request from " + global.username;
            fetch("http://54.252.181.63/user/" + name + "/notifs?id=" + id + "&category=Friend&message=" + message, {
                method: 'POST',
            }).then((response) => response.json())
            .catch((error) => console.error(error));

        }else if (category == "Group"){
            const message = global.username + " has invited you to join the group " + convertToPlus(group);
            fetch("http://54.252.181.63/user/" + name + "/notifs?id=" + id + "&category=" + "Group" + "&message=" + message, {
                method: 'POST',
            }).then((response) => response.json())
            .catch((error) => console.error(error));
        }else if (category == "Deck"){
            const message = global.username + " has created the deck '" + group+  "'. Check it out now!";
            fetch("http://54.252.181.63/user/" + name + "/notifs?id=" + id + "&category=" + "Deck" + "&message=" + message, {
                method: 'POST',
            }).then((response) => response.json())
            .catch((error) => console.error(error));
        }else if (category == "DeckVote"){
            const message = "Voting has started for the deck '" + group + "'. Start choosing!";
            fetch("http://54.252.181.63/user/" + name + "/notifs?id=" + id + "&category=" + "Deck" + "&message=" + message, {
                method: 'POST',
            }).then((response) => response.json())
            .catch((error) => console.error(error));
        }else if (category == 'friendAccept'){
            const message = global.username + ' has accepted your friend request';
            fetch("http://54.252.181.63/user/" + name + "/notifs?id=" + id + "&category=" + "friendAccept" + "&message=" + message, {
                method: 'POST',
            }).then((response) => response.json())
            .catch((error) => console.error(error));
        }

    }
}