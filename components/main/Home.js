import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import firebase from 'firebase'
import styles from '../styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserCompletedTests } from '../../redux/actions/index'
// React Native Paper docs: https://callstack.github.io/react-native-paper/
import { Title } from 'react-native-paper';

function Home(props) {

    const studyTips = ["Always try to eliminate three answer choices.",
    "Always understand what you got wrong and why you got it wrong.",
    "For reading sections, skimming the passages to understand the main idea is often effective to save on time.",
    "For informational passages on the reading section, the first paragraph's thesis will help greatly in answering questions about the passage as a whole.",
    "Make the passages more personally interesting to you. Psychology studies have shown that learning is greatly increased when the material is made personally relevant to the students, and become interested in it.",
    "Be careful with answer choices that say NO CHANGE, as these will only be correct less than 25% of the time.",
    "When faced with two grammatically correct options, pick the more concise option.",
    "Develop a plan for each separate section of the SAT.",
    "Try to avoid answering the questions in order, especially on the Reading section.",
    "Study a wide variety of vocabulary words that are bound to pop up on the SAT.",
    "Mark questions where you're even 20% unsure of your answer. If you have time after finishing the section, go back and check your answer for the marked one rigorously.",
    "If you're absolutely certain of your answer, mark it as such. That way, if you still have time to review after finishing a section, you won't waste any valuable time on questions you are certain about.",
    "Plugging in an answer and checking it on the Math section can sometimes be faster than solving the equation or using another formula.",
    "For the Reading section, try to answer questions specifically asking for information on a certain line. Don't forget to also mark up the passage when you see these questions.",
    "Historical passages on the SAT don't require background knowledge on historical events, and the SAT often puts in a question or two that may cause a conflict between the correct answer and historical background.",
    "There's a reason why the College Board says that only the answer sheet will be scored - you should mark up your test booklet as much as you can!",
    "The night before the test, make sure all the materials you will need going in are neatly laid out and easily accessible. Get at least 8 hours of sleep, and don't look at any screens for at least an hour and a half before going to bed.",
    "Even if you don't know the answer, guess. Blank answers won't be scored, so it's better to have a 1 in 4 chance that you get the right answer than a chance of zero.",
    "Be sure to bring your own watch to keep track of the time (no smartwatches!). You can't always guarantee that your testing center will have a clock at all, or even a working one.",
    "Practice, practice, practice! Most students of top colleges with near-perfect SAT scores said that their biggest help was taking as many practice tests as possible.",
    "For questions on the writing section that ask you where a sentence should be placed in a paragraph, keep repeating the paragraph aloud to yourself with each different answer choice if the answer isn't obvious at first.",
    "For the grid-answer questions on the Math section, there will NEVER be negative numbers. If you got a negative number as your answer, you did something wrong!",
    "Questions on the Math section require a general knowledge of algebra, geometry, trigonometry, statistics, and rarely, calculus.",
    "Did you know that SAT subject tests and the SAT essay will be permanently gone by June 2021?",
    "Start studying for the SAT early. According to the College Board, the best time to start is about 2-3 months before your test date.",
    "It is best to test practice tests in the morning as opposed to later in the day, since your test is usually administered around 8:00 AM.", 
    ];

    const [tip, setTip] = useState('');
    
    useEffect(() => {
        if(props.currentUser){
            props.fetchUser();
        } else {
            console.log("no user sorry");
        }
    }, [props.currentUser] )

    useEffect(() => {
        const random = Math.floor(Math.random() * studyTips.length);
        setTip(studyTips[random])
    }, [] )
    
    useEffect(() => {
        props.fetchUserCompletedTests();
    }, [props.completedTests] )
    
    const { currentUser } = props;

    return (
        <View style={{flex: 1}}>
            <View style={{marginTop: 20}}>
                <Title style={[styles.title2, { marginTop: 25, marginLeft: 25,}]}>
                    Welcome back, {currentUser.name}!
                </Title>
            </View>
            <View style={{marginTop: 20}}>
                <Title style={[styles.title2, { marginTop: 25, marginLeft: 25,}]}>
                    Tests you've taken:
                </Title>         
                <FlatList
                    data={props.completedTests}
                    numColumns={1}
                    horizontal={true}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<Text style={{marginTop: 20, marginLeft: 25, marginRight: 25 }}>None so far! Head over to Study and take a test!{"\n"}Psst... before you do that, go to Profile and set a target score for yourself.</Text>}
                    renderItem={({ item }) => (
                        <View style={[styles.scoreOverview, { backgroundColor: '#596b96' }]}>
                            <Text style={{marginLeft: 5, marginRight: 5}}>{item.id}</Text>
                            <Text style={{marginLeft: 5, marginRight: 5}}>Your score: {item.testScore}</Text>
                            
                            <Text style={{marginLeft: 5, marginRight: 5}}>Additional points needed to reach target: {item.difference}</Text>
                        </View>
                )} />
            </View>
            <View style={{marginTop: 20}}>
                <Title style={[styles.title2, { marginTop: 25, marginLeft: 25,}]}>
                    What's next:
                </Title>
                <Text style={{marginTop: 20, marginLeft: 25, marginRight: 25 }}>Take all the SAT and PSAT tests that haven't shown up here!</Text>
            </View>
            <View style={{marginTop: 20}}>
                <Title style={[styles.title2, { marginTop: 25, marginLeft: 25}]}>
                    Study tip of the day:
                </Title>
                <Text style={{marginTop: 20, marginLeft: 25, marginRight: 25 }}>{tip}</Text>
            </View>
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    completedTests: store.userState.completedTests
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserCompletedTests}, dispatch)
export default connect(mapStateToProps, mapDispatchProps)(Home);