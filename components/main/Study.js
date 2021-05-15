import React, { Component } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import HubScreen from './studyWebviews/Hub'
import LinksScreen from './studyWebviews/Links'

// This file serves to navigate between the hub of all tests and the webview of any particular test, its answers, or an answer sheet
export default class Study extends Component {
    render() {
        return (
            <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Hub">
                <Stack.Screen name="Hub" component={HubScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Link" component={LinksScreen}/>
            </Stack.Navigator>
            </NavigationContainer>
        );
    }
}