import React, { Component } from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { View } from 'react-native'

// import everything we need from firebase
import firebase from "firebase/app"
import '@firebase/auth';
import '@firebase/firestore';

// Redux docs: https://redux.js.org/introduction/getting-started
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

const firebaseConfig = {
  apiKey: "AIzaSyBZqWJmRYd6AIaqAR28ERufTQRuuOaYJx4",
  authDomain: "sat-academy-final-project.firebaseapp.com",
  projectId: "sat-academy-final-project",
  storageBucket: "sat-academy-final-project.appspot.com",
  messagingSenderId: "777569984947",
  appId: "1:777569984947:web:538d6185fdfa2433556bc6",
  measurementId: "G-1NJGYQ7Y8H"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// React Navigation docs: https://reactnavigation.org/docs/navigation-container/
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import all screens we need for navigation
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  // Use onAuthStateChanged() to check the auth status of the user and render the app as such
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  // When the app is loading in content, show this loading-in indicator
  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
          <ActivityIndicator animating={true} color={Colors.red800} size='large' />
        </View>
      )
    }

    // If the user is not logged in, display all the pages that allow the user to register/login
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    // When the user is logged in AND the app is loaded, display the main app content
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App
