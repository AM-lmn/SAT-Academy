import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, Text, Keyboard, TouchableWithoutFeedback, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Ionicons } from '@expo/vector-icons';
// https://ionicons.com/
import firebase from 'firebase'

import styles from '../styles'

export class Register extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            profilePicture: '',
            errorMessage: null
        }
        this.onSignUp = this.onSignUp.bind(this)
        this.onGoogleSignUp = this.onGoogleSignUp.bind(this)
    }

    // Creates user with provided credentials and then stores the data in the Firestore
    onSignUp() {
        const { email, password, confirmPassword, name } = this.state;
        if (password !== confirmPassword) {
            this.setState({ errorMessage: "Passwords don't match." })
            return
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email
            })
        console.log(result)
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    }

    // Signs up the user with Google, then stores the name and email of the user as those associated with their Google account
    onGoogleSignUp(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((cred) => {
            
            const { user } = cred
            const { displayName, email } = user
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
                name: displayName, 
                email
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <View>
                <KeyboardAwareScrollView
                keyboardShouldPersistTaps="always">
                    <View style={{margin: 5}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Landing")}>
                            <Ionicons name="arrow-back-sharp" size={50} color="gray" />
                        </TouchableOpacity>
                    </View>
                    <TouchableWithoutFeedback 
                    onPress={() => Keyboard.dismiss()}
                    >
                        <View style={styles.titleRegisterAndLogin}>
                            <Image
                                style={styles.logoStyle2}
                                source={require('../../assets/satlogo.png')}
                                resizeMode="cover"
                            />
                                <Text style={styles.titleText2}>
                                    SAT Academy
                                </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TextInput
                        style={styles.input}
                        placeholder='Name'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(name) => this.setState({ name })}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(email) => this.setState({ email })}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Password'
                        onChangeText={(password) => this.setState({ password })}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Confirm Password'
                        onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'red'}}>
                            {this.state.errorMessage}
                        </Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.onSignUp()}>
                                <Text style={styles.buttonTitle}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableWithoutFeedback 
                    onPress={() => Keyboard.dismiss()}
                    >
                        <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
                            <Text style={{fontSize: 16, color: '#2e2e2d'}}>Already have an account with SAT Academy? <Text onPress={() => this.props.navigation.navigate("Login")} style={{color: "lightblue", fontWeight: "bold", fontSize: 16}}>Log in</Text></Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 5}}>
                        <Image
                            style={styles.orImage}
                            source={require('../../assets/or.png')}
                        />
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10,}}>
                        <TouchableOpacity
                        onPress={() => this.onGoogleSignUp()}>
                            <Image
                                style={styles.google}
                                source={require('../../assets/google.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

export default Register