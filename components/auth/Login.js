import React, { Component } from 'react'
import { View, TextInput, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Ionicons } from '@expo/vector-icons';
// https://ionicons.com/
import firebase from 'firebase'

import styles from '../styles'

/* TODO: Make the "Don't have an account? Sign up" thing work */

export class Login extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            errorMessage: null
        }

        this.onSignIn = this.onSignIn.bind(this)
    }

    // Signs in the user
    onSignIn(){
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    }

    // Signs in the user with Google
    // NOTE: It is already expected that the user has made an account via signing up with Google if using this function.
    onGoogleLogin(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(() => { 

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
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'red'}}>
                            {this.state.errorMessage}
                        </Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.onSignIn()}>
                                <Text style={styles.buttonTitle}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableWithoutFeedback 
                    onPress={() => Keyboard.dismiss()}
                    >
                        <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
                            <Text style={{fontSize: 16, color: '#2e2e2d'}}>New to SAT Academy? <Text onPress={() => this.props.navigation.navigate("Register")} style={{color: "lightblue", fontWeight: "bold", fontSize: 16}}>Sign up</Text></Text>
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
                        onPress={() => this.onGoogleLogin()}>
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

export default Login