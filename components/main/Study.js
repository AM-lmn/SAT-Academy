import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import styles from '../styles'
import { Avatar, Title, Caption, TouchableRipple, } from 'react-native-paper';

export default function Study() {
    return (
        <View style={{flex: 1}}>
            <ScrollView
                scrollEventThrottle={16}
            >
                <View style={styles.practiceTestContainer}>
                    <Title style={[styles.title2, { marginTop: 25, marginLeft: 25,}]}>
                        Practice Tests
                    </Title>
                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#871' }]}>
                        <Text>Practice Test #1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#317' }]}>
                        <Text>Practice Test #2</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <ScrollView
                scrollEventThrottle={16}
                horizontal={true}
            >
                <View style={{marginTop: 20}}>
                    <Title style={[styles.title2, { marginTop: 25, marginLeft: 25,}]}>
                        By category:
                    </Title>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={[styles.practiceQuestionButton, { backgroundColor: '#4A4' }]}>
                            <Text>Reading</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.practiceQuestionButton, { backgroundColor: '#758' }]}>
                            <Text>Writing</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.practiceQuestionButton, { backgroundColor: '#367' }]}>
                            <Text>Math</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}