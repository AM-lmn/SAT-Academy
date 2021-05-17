import React, { Component } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Colors } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// https://materialdesignicons.com/

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, clearData, fetchUserCompletedTests } from '../redux/actions/index'

import ProfileScreen from './main/Profile'
import HomeScreen from './main/Home'
import StudyScreen from './main/Study'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
const Tab = createMaterialBottomTabNavigator();
// https://reactnavigation.org/docs/bottom-tab-navigator/

export class Main extends Component {
    componentDidMount() {
        this.props.clearData();
        this.props.fetchUser();
        this.props.fetchUserCompletedTests();
    }
    render() {
        const { currentUser } = this.props;
        if(currentUser == undefined){
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
                    <ActivityIndicator animating={true} color={Colors.red800} size='large' />
                </View>
            )
        }
     
        return (
            <Tab.Navigator initialRouteName="Home" activeColor="#f0edf6" barStyle={{ backgroundColor: '#694fad' }} shifting='true'>
                <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarLabel: 'Home', tabBarColor: '#FF6347', tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
                }} />
                <Tab.Screen name="Study" component={StudyScreen}
                options={{
                    tabBarLabel: 'Study', tabBarColor: '#694FAD', tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="school" color={color} size={26}/>
                    ),
                }} />
                <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile', tabBarColor: '#1F65FF', tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26}/>
                    ),
                }} />
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, clearData, fetchUserCompletedTests}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main);
