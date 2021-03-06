import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import styles from '../../styles'
import firebase from 'firebase'
import { Title } from 'react-native-paper';

export default class Hub extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            score: ''
        }
        this.recordScore = this.recordScore.bind(this)
    }

    // Records the score of the test. If the test was not previously taken, create a new Firestore document. If the test WAS previously taken, update the Firestore document.
    recordScore(testName){
        const {score} = this.state;
        const user = firebase.auth().currentUser;
        if(score === ''){
            window.alert("Please do not leave this field blank!");
        }
        else if(score > 1600 || score < 400 || isNaN(score)) {
            window.alert("Please enter a valid score.");
        }  
        else {       
            firebase.firestore().collection("users").doc(user.uid).collection("scores").doc(testName).get().then((scoresDoc) => {
                if (scoresDoc.exists){
                    const scoreAsInt = Number.parseInt(score);
                    firebase.firestore().collection("users").doc(user.uid).get().then((userDoc) => {
                        const targetScoreInt = Number.parseInt(userDoc.data()["target"]);
                        var trueDiff;
                        if ((targetScoreInt - scoreAsInt) < 0 || (targetScoreInt - scoreAsInt) === 0){
                            trueDiff = 0;
                        } else {
                            trueDiff = targetScoreInt - scoreAsInt;
                        }
                        firebase.firestore().collection("users").doc(user.uid).collection("scores").doc(testName).update({
                            testScore: score,
                            difference: trueDiff,
                            targetReached: ((targetScoreInt - scoreAsInt) < 0 || (targetScoreInt - scoreAsInt) === 0)
                        });
                        window.alert("Success! Head over to Home to get an overview of this data.");
                    })
                } else {
                    // If the user has not taken this test before, create a new set of data
                    const scoreAsInt = Number.parseInt(score);
                    firebase.firestore().collection("users").doc(user.uid).get().then((userDoc) => {
                        const targetScoreInt = Number.parseInt(userDoc.data()["target"]);
                        var trueDiff;
                        if ((targetScoreInt - scoreAsInt) < 0 || (targetScoreInt - scoreAsInt) === 0){
                            trueDiff = 0;
                        } else {
                            trueDiff = targetScoreInt - scoreAsInt;
                        }
                        firebase.firestore().collection("users").doc(user.uid).collection("scores").doc(testName).set({
                            testScore: score,
                            difference: trueDiff,
                            targetReached: ((targetScoreInt - scoreAsInt) < 0 || (targetScoreInt - scoreAsInt) === 0)
                        });
                        window.alert("Success! Head over to Home to get an overview of this data.");
                    })
                }
            })
        }
        this.setState({
            score: ''
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView
                    scrollEventThrottle={16}
                >  
                    <View style={styles.practiceSATTestContainer}>
                        <Title style={styles.title2}>
                            SAT Tests
                        </Title>
                        <ScrollView
                            scrollEventThrottle={16}
                        >   
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#596b96' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 1', type: 'SAT'
                                        });
                                    }}>
                                        <Text>CB Practice Test 1</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#596b96' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 1 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>CB Practice Test 1 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("CB Practice Test 1")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#0e3c7d' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 2', type: 'SAT'
                                        });
                                    }}>
                                        <Text>CB Practice Test 2</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#0e3c7d' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 2 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>CB Practice Test 2 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("CB Practice Test 2")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#ff2ae6' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 3', type: 'SAT'
                                        });
                                    }}>
                                        <Text>CB Practice Test 3</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#ff2ae6' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 3 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>CB Practice Test 3 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("CB Practice Test 3")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#38463e' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 4', type: 'SAT'
                                        });
                                    }}>
                                        <Text>CB Practice Test 4</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#38463e' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 4 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>CB Practice Test 4 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("CB Practice Test 4")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#c06350' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 5', type: 'SAT'
                                        });
                                    }}>
                                        <Text>CB Practice Test 5</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#c06350' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 5 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>CB Practice Test 5 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("CB Practice Test 5")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#417cd4' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 6', type: 'SAT'
                                        });
                                    }}>
                                        <Text>CB Practice Test 6</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#417cd4' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 6 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>CB Practice Test 6 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("CB Practice Test 6")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#dfa667' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 7', type: 'SAT'
                                        });
                                    }}>
                                        <Text>CB Practice Test 7</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#dfa667' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 7 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>CB Practice Test 7 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("CB Practice Test 7")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#73a167' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 8', type: 'SAT'
                                        });
                                    }}>
                                        <Text>CB Practice Test 8</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#73a167' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 8 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>CB Practice Test 8 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("CB Practice Test 8")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#b2bad6' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 9', type: 'SAT'
                                        });
                                    }}>
                                        <Text>CB Practice Test 9</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#b2bad6' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 9 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>CB Practice Test 9 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("CB Practice Test 9")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#ed7062' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 10', type: 'SAT'
                                        });
                                    }}>
                                        <Text>CB Practice Test 10</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#ed7062' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'CB Practice Test 10 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>CB Practice Test 10 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("CB Practice Test 10")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#8abcb0' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'March QAS 2021', type: 'SAT'
                                        });
                                    }}>
                                        <Text>March QAS 2021 (Answers included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("March QAS 2021")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#ee1300' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'October 2020 SAT', type: 'SAT'
                                        });
                                    }}>
                                        <Text>October 2020 SAT (Answers included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("October 2020 SAT")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#6d9ab2' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'March QAS 2020', type: 'SAT'
                                        });
                                    }}>
                                        <Text>March QAS 2020 (Answers and scoring included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("March QAS 2020")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#6add20' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'October QAS 2019', type: 'SAT'
                                        });
                                    }}>
                                        <Text>October QAS 2019 (Answers and scoring included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("October QAS 2019")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#d6e9c0' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'May 2019 SAT', type: 'SAT'
                                        });
                                    }}>
                                        <Text>May 2019 SAT (Answers included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("May 2019 SAT")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#5c38d0' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'May 2019 International Practice Test', type: 'SAT'
                                        });
                                    }}>
                                        <Text style={{marginLeft: 5, marginRight: 5}}>May 2019 International Practice Test (Answers included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("May 2019 International Practice Test")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#8ddf77' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'April QAS 2019', type: 'SAT'
                                        });
                                    }}>
                                        <Text style={{marginLeft: 5, marginRight: 5}}>April QAS 2019 (Answers and scoring included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("April QAS 2019")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#a535db' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'March 9 2019 SAT', type: 'SAT'
                                        });
                                    }}>
                                        <Text>March 9, 2019 SAT (Answers included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("March 9 2019 SAT")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>                                                      
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#28e5e5' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'May 2018 QAS', type: 'SAT'
                                        });
                                    }}>
                                        <Text style={{marginLeft: 5, marginRight: 5}}>May 2018 QAS (Answers and scoring included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("May 2018 QAS")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#ee21c7' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'April 24 2018 SAT', type: 'SAT'
                                        });
                                    }}>
                                        <Text>April 24, 2018 SAT (Answers and scoring included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("April 24 2018 SAT")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#046486' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'April 2018 QAS', type: 'SAT'
                                        });
                                    }}>
                                        <Text>April 2018 QAS (Answers and scoring included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("April 2018 QAS")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#c62254' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'March 2018 QAS', type: 'SAT'
                                        });
                                    }}>
                                        <Text>March 2018 QAS (Answers and scoring included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("March 2018 QAS")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#b8403d' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'May 2017 QAS', type: 'SAT'
                                        });
                                    }}>
                                        <Text>May 2017 QAS (Answers included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("May 2017 QAS")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#1797c8' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'April 2017 QAS', type: 'SAT'
                                        });
                                    }}>
                                        <Text>April 2017 QAS (Answers and scoring included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("April 2017 QAS")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>   
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#75152d' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'Ivy Global SAT Practice Test 1', type: 'SAT'
                                        });
                                    }}>
                                        <Text style={{marginLeft: 5, marginRight: 5}}>Ivy Global SAT Practice Test 1 (Answers and scoring included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("Ivy Global SAT Practice Test 1")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#72d1c1' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'Ivy Global SAT Practice Test 2', type: 'SAT'
                                        });
                                    }}>
                                        <Text style={{marginLeft: 5, marginRight: 5}}>Ivy Global SAT Practice Test 2 (Answers and scoring included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("Ivy Global SAT Practice Test 2")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#fea1b7' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'McGraw Hill 2017 SAT Practice Test 1', type: 'SAT'
                                        });
                                    }}>
                                        <Text>McGraw Hill 2017 SAT Practice Test 1 (Answers included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("McGraw Hill 2017 SAT Practice Test 1")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#da0c7b' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'McGraw Hill 2017 SAT Practice Test 2', type: 'SAT'
                                        });
                                    }}>
                                        <Text>McGraw Hill 2017 SAT Practice Test 2 (Answers included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("McGraw Hill 2017 SAT Practice Test 2")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#573966' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'McGraw Hill 2017 SAT Practice Test 3', type: 'SAT'
                                        });
                                    }}>
                                        <Text>McGraw Hill 2017 SAT Practice Test 3 (Answers included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("McGraw Hill 2017 SAT Practice Test 3")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#e57920' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'McGraw Hill 2018 SAT Practice Test 1', type: 'SAT'
                                        });
                                    }}>
                                        <Text>McGraw Hill 2018 SAT Practice Test 1 (Answers included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("McGraw Hill 2018 SAT Practice Test 1")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#51f81a' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'McGraw Hill 2018 SAT Practice Test 2', type: 'SAT'
                                        });
                                    }}>
                                        <Text>McGraw Hill 2018 SAT Practice Test 2 (Answers included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("McGraw Hill 2018 SAT Practice Test 2")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#7526b6' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'McGraw Hill 2018 SAT Practice Test 3', type: 'SAT'
                                        });
                                    }}>
                                        <Text>McGraw Hill 2018 SAT Practice Test 3 (Answers included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("McGraw Hill 2018 SAT Practice Test 3")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#8abcb0' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'Kaplan SAT Practice Test 1', type: 'SAT'
                                        });
                                    }}>
                                        <Text style={{marginLeft: 5, marginRight: 5}}>Kaplan SAT Practice Test 1 (Answers included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("Kaplan SAT Practice Test 1")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#1fce65' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'Princeton Review 2017 SAT Practice Test 1', type: 'SAT'
                                        });
                                    }}>
                                        <Text style={{marginLeft: 5, marginRight: 5}}>Princeton Review 2017 SAT Practice Test 1 (Scoring included)</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#1fce65' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'Princeton Review 2017 SAT Practice Test 1 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>Princeton Review 2017 SAT Practice Test 1 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("Princeton Review 2017 SAT Practice Test 1")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#77e172' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'Princeton Review 2017 SAT Practice Test 2', type: 'SAT'
                                        });
                                    }}>
                                        <Text style={{marginLeft: 5, marginRight: 5}}>Princeton Review 2017 SAT Practice Test 2 (Scoring included)</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#77e172' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'Princeton Review 2017 SAT Practice Test 2 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>Princeton Review 2017 SAT Practice Test 2 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("Princeton Review 2017 SAT Practice Test 2")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#64375c' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'Princeton Review 2017 SAT Practice Test 3', type: 'SAT'
                                        });
                                    }}>
                                        <Text style={{marginLeft: 5, marginRight: 5}}>Princeton Review 2017 SAT Practice Test 3 (Scoring included)</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#64375c' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'Princeton Review 2017 SAT Practice Test 3 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>Princeton Review 2017 SAT Practice Test 3 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("Princeton Review 2017 SAT Practice Test 3")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#368f12' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'Princeton Review 2017 SAT Practice Test 4', type: 'SAT'
                                        });
                                    }}>
                                        <Text style={{marginLeft: 5, marginRight: 5}}>Princeton Review 2017 SAT Practice Test 4 (Scoring included)</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#368f12' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'Princeton Review 2017 SAT Practice Test 4 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>Princeton Review 2017 SAT Practice Test 4 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("Princeton Review 2017 SAT Practice Test 4")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#8808fd' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'Princeton Review 2018 SAT Practice Test 1', type: 'SAT'
                                        });
                                    }}>
                                        <Text style={{marginLeft: 5, marginRight: 5}}>Princeton Review 2018 SAT Practice Test 1 (Scoring included)</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#8808fd' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'Princeton Review 2018 SAT Practice Test 1 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>Princeton Review 2018 SAT Practice Test 1 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("Princeton Review 2018 SAT Practice Test 1")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.practicePSATTestContainer}>
                        <Title style={styles.title2}>
                            PSAT Tests
                        </Title>
                        <ScrollView
                            scrollEventThrottle={16}
                        >    
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#643ae9' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT NMSQT Practice Test 1', type: 'PSAT'
                                        });
                                    }}>
                                        <Text>PSAT/NMSQT Practice Test 1</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#643ae9' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT/NMSQT Practice Test 1 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>PSAT/NMSQT Practice Test 1 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("PSAT NMSQT Practice Test 1")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#0d4c8f' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT NMSQT Practice Test 2', type: 'PSAT'
                                        });
                                    }}>
                                        <Text>PSAT/NMSQT Practice Test 2</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#0d4c8f' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT/NMSQT Practice Test 2 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>PSAT/NMSQT Practice Test 2 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("PSAT NMSQT Practice Test 2")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#4dae89' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT 10 Practice Test 1', type: 'PSAT'
                                        });
                                    }}>
                                        <Text>PSAT 10 Practice Test 1</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#4dae89' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT 10 Practice Test 1 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>PSAT 10 Practice Test 1 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("PSAT 10 Practice Test 1")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#af47c5' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT 10 Practice Test 2', type: 'PSAT'
                                        });
                                    }}>
                                        <Text>PSAT 10 Practice Test 2</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#af47c5' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT 10 Practice Test 2 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>PSAT 10 Practice Test 2 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("PSAT 10 Practice Test 2")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#d633a6' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT 8 9 Practice Test 1', type: 'PSAT'
                                        });
                                    }}>
                                        <Text>PSAT 8/9 Practice Test 1</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#d633a6' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT 8/9 Practice Test 1 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>PSAT 8/9 Practice Test 1 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("PSAT 8 9 Practice Test 1")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#ccbbe9' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'October 2020 PSAT', type: 'PSAT'
                                        });
                                    }}>
                                        <Text style={{marginLeft: 5, marginRight: 5}}>October 2020 PSAT (Answers and scoring included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("October 2020 PSAT")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#71e029' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'November 16 2019 PSAT QAS', type: 'PSAT'
                                        });
                                    }}>
                                        <Text style={{marginLeft: 5, marginRight: 5}}>November 16 2019 PSAT QAS (Answers and scoring included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("November 16 2019 PSAT QAS")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#68b3b0' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'October 2019 PSAT', type: 'PSAT'
                                        });
                                    }}>
                                        <Text>October 2019 PSAT (Answers and scoring included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("October 2019 PSAT")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View> 
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#5c677f' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT 10 April 2019', type: 'PSAT'
                                        });
                                    }}>
                                        <Text>PSAT 10 April 2019</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#5c677f' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT 10 April 2019 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>PSAT 10 April 2019 Answers</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("PSAT 10 April 2019")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#d68df7' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'November 24 2018 PSAT', type: 'PSAT'
                                        });
                                    }}>
                                        <Text>November 24 2018 PSAT (Answers and scoring included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("November 24 2018 PSAT")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#1a5042' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'October 10 2018 PSAT', type: 'PSAT'
                                        });
                                    }}>
                                        <Text style={{marginLeft: 5, marginRight: 5}}>October 10 2018 PSAT (Answers and scoring included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("October 10 2018 PSAT")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#efa0b2' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'October 25 2017 PSAT', type: 'PSAT'
                                        });
                                    }}>
                                        <Text>October 25 2017 PSAT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#efa0b2' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT 10/11/17 and PSAT 10/25/17 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>PSAT 10/25/17 Answers (2nd page)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("October 25 2017 PSAT")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#62288c' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT October 14 2017', type: 'PSAT'
                                        });
                                    }}>
                                        <Text style={{marginLeft: 5, marginRight: 5}}>PSAT October 14 2017 (Answers and scoring included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("PSAT October 14 2017")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#09b65f' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT October 11 2017', type: 'PSAT'
                                        });
                                    }}>
                                        <Text style={{marginLeft: 5, marginRight: 5}}>PSAT October 11 2017 (Answers and scoring included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("PSAT October 11 2017")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>   
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#9a014e' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT 10 Spring 2017', type: 'PSAT'
                                        });
                                    }}>
                                        <Text>PSAT 10 Spring 2017 (Answers included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("PSAT 10 Spring 2017")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#7ecfbe' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT November 2 2016', type: 'PSAT'
                                        });
                                    }}>
                                        <Text>PSAT November 2 2016</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#7ecfbe' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT 11/2/16 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>PSAT 11/2/16 Answers (Page 15)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("PSAT November 2 2016")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#542cf4' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT October 19 2016', type: 'PSAT'
                                        });
                                    }}>
                                        <Text>PSAT October 19 2016</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#542cf4' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT 11/2/16 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>PSAT 10/19/16 Answers (Page 14)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("PSAT October 19 2016")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#6167c7' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT October 15 2016', type: 'PSAT'
                                        });
                                    }}>
                                        <Text>PSAT October 15 2016</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#6167c7' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT 11/2/16 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>PSAT 10/15/16 Answers (Page 14)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("PSAT October 15 2016")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#1a79e7' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT October 28 2015', type: 'PSAT'
                                        });
                                    }}>
                                        <Text>PSAT October 28 2015</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#1a79e7' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT 10/28/15 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>PSAT 10/28/15 Answers (Page 14)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("PSAT October 28 2015")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#112083' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT October 14 2015', type: 'PSAT'
                                        });
                                    }}>
                                        <Text>PSAT October 14 2015</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#112083' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'PSAT 10/28/15 Answers', type: 'Answer Key'
                                        });
                                    }}>
                                        <Text>PSAT 10/14/15 Answers (Page 14)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("PSAT October 14 2015")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#b4eea8' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'Princeton Review PSAT NMSQT 2018 Practice Test 1', type: 'PSAT'
                                        });
                                    }}>
                                        <Text style={{marginLeft: 5, marginRight: 5}}>Princeton Review PSAT NMSQT 2018 Practice Test 1 (Answers included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("Princeton Review PSAT NMSQT 2018 Practice Test 1")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.testAndAnswerAndScoreEnterSection}>
                                <ScrollView
                                    scrollEventThrottle={16}
                                    horizontal={true}
                                >   
                                    <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#337aef' }]}
                                    onPress={() => {
                                        this.props.navigation.navigate('Link', {
                                            site: 'Princeton Review PSAT NMSQT 2018 Practice Test 2', type: 'PSAT'
                                        });
                                    }}>
                                        <Text style={{marginLeft: 5, marginRight: 5}}>Princeton Review PSAT NMSQT 2018 Practice Test 2 (Answers included)</Text>
                                    </TouchableOpacity>
                                    <View style={styles.enterAndSubmitScoreContainer}>
                                        <TextInput
                                            style={styles.inputSubmitScore}
                                            placeholder='Enter your score'
                                            placeholderTextColor="#aaaaaa"
                                            onChangeText={(score) => this.setState({ score })}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.logoutButton}
                                            onPress={() => this.recordScore("Princeton Review PSAT NMSQT 2018 Practice Test 2")}>
                                                <Text style={styles.buttonTitleLogout}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.sampleAnswerSheetsContainer}>
                        <Title style={styles.title2}>
                            Answer Sheets
                        </Title>
                        <ScrollView
                            scrollEventThrottle={16}
                        >       
                            <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#9e78dc' }]}
                            onPress={() => {
                                this.props.navigation.navigate('Link', {
                                    site: 'Sample SAT Answer Sheet', type: 'Answer Sheet'
                                });
                            }}>
                                <Text>Sample SAT Answer Sheet</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.practiceTestButton, { backgroundColor: '#44b6de' }]}
                            onPress={() => {
                                this.props.navigation.navigate('Link', {
                                    site: 'Sample PSAT Answer Sheet', type: 'Answer Sheet'
                                });
                            }}>
                                <Text>Sample PSAT Answer Sheet</Text>
                            </TouchableOpacity>   
                        </ScrollView>
                    </View>
                    <Text style={{ marginTop: 20, marginLeft: 25, marginRight: 25, marginBottom: 10 }}>...and that's it! If you want more tests then please contact the developer.</Text>
                    <Text style={{ marginLeft: 25, marginRight: 25, marginBottom: 10 }}>Email: amalik34@hotmail.com</Text>
                    <Text style={{ marginLeft: 25, marginRight: 25, marginBottom: 30 }}>GitHub: https://github.com/AM-lmn</Text>
                </ScrollView>
            </View>
        )
    }
}