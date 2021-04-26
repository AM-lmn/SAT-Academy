import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, clearData } from '../redux/actions/index'

import ProfileScreen from './main/Profile'
import HomeScreen from './main/Home'
import StudyScreen from './main/Study'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
const Tab = createMaterialBottomTabNavigator();

export class Main extends Component {
    componentDidMount() {
        this.props.clearData();
        this.props.fetchUser();
    }
    render() {
        const { currentUser } = this.props;
        if(currentUser == undefined){
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
     
        return (
            <Tab.Navigator initialRouteName="Home" activeColor="#f0edf6" barStyle={{ backgroundColor: '#694fad' }} shifting='true'>
                <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarLabel: 'Home', tabBarColor: '#FF6347', tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
                }} />
                <Tab.Screen name="Study" component={StudyScreen}
                options={{
                    tabBarLabel: 'Study', tabBarColor: '#694FAD', tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="school" color={color} size={26}/>
                    ),
                }} />
                <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile', tabBarColor: '#1F65FF', tabBarIcon: ({ color, size }) => (
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
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, clearData}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main);
