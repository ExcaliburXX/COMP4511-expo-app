import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, ActivityIndicator } from "react-native";
import Toast from 'react-native-simple-toast';

import background from '../../assets/images/background.png';
import logo from '../../assets/images/logo.png';
import styles from './style';

const users_url = 'http://54.252.181.63/users';


export default function SignUp({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [triedSignup, setTriedSignup] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmitSignUp = () => {
        if (!username || !email || !password || !confirmPassword || confirmPassword !== password) {
            return;
        }        

        if (!isValidEmail(email)) {
            return;
        }

        // fetch from API
        const postRequestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id: username,
                password: password,
            })
        };
        setLoading(true);
        fetch(`${users_url}?id=${username}&password=${password}`, postRequestOptions)
            .then(response => response.json())
            .then(data => {
                if (!data.message) {  
                    global.username=username;
                    global.introPhase = 0;
                    navigation.replace('Nav');
                    setAuthenticated(true);
                    Toast.show("Sign up successful");  
                    setLoading(false);
                }
                else {
                    setTriedSignup(true);
                    setAuthenticated(false);
                }
        });
    };

    const isValidEmail = (email) => {
        const emailRegex = /^([\-a-zA-Z0-9_\.]+@[a-zA-Z0-9]+\.[a-zA-Z]+)$/;
        if (emailRegex.test(email)) return true;
        return false;
    };

    const renderUsername = () => {
        return (
            <View style={{ marginTop: 20 }}>
                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.textInput} onChangeText={text => setUsername(text)} value={username} />
            </View>
        );
    }

    const renderEmail = () => {
        return (
            <View style={{ marginTop: 20 }}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput style={styles.textInput} onChangeText={text => setEmail(text)} value={email} />
                { (email !== '') && !isValidEmail(email) && <Text style={{ paddingLeft: 10 }}>Please enter a valid email address</Text>}
            </View>
        ); 
    };

    const renderPassword = () => {
        return (
            <View style={{ marginTop: 20 }}>
                <Text style={styles.label}>Password</Text>
                <TextInput secureTextEntry={true} style={styles.textInput} onChangeText={text => setPassword(text)} value={password} />
            </View>
        ); 
    };

    const renderConfirmPassword = () => {
        return (
            <View style={{ marginTop: 20 }}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput secureTextEntry={true} style={styles.textInput} onChangeText={text => setConfirmPassword(text)} value={confirmPassword} />
                { (confirmPassword === '') && (password !== '') && <Text style={{ paddingLeft: 10 }}>Please re-enter your password</Text>}
                { (confirmPassword !== '') && (password !== '') && (confirmPassword !== password) && <Text style={{ paddingLeft: 10 }}>Your passwords do not match</Text>}
            </View>
        ); 
    };

    const renderInvalidSignup = () => {
        setLoading(false);
        return (
            <View style={styles.invalidSignupBox}>
                <Text style={styles.invalidSignup}>Account already exists. </Text>
            </View>
        );
    };

    return (
        <ImageBackground source={background} style={[styles.background, styles.container]}>
            <Image source={logo} style={styles.logo}/>
            
            { loading && <ActivityIndicator color={'#fffff'} size={'large'}></ActivityIndicator> }
            { triedSignup && !authenticated && renderInvalidSignup() }
            {renderUsername()}
            {renderEmail()}
            {renderPassword()}
            {renderConfirmPassword()}
          
            <TouchableOpacity style={styles.createAccountButton} onPress={() => onSubmitSignUp()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Create Account</Text>
            </TouchableOpacity>
            
            <Text style={styles.loginText} onPress={() => navigation.replace('Login')}>Already have an account? Log in</Text>
             
        </ImageBackground>
    );
    
}