import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, TextInput, Button, Platform, Image } from 'react-native'
import firebase from 'firebase'
import styles from '../styles'
import { connect } from 'react-redux'
import { Avatar, Title, Caption, Text, TouchableRipple, } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';


function Profile(props) {
    const { currentUser } = props;
    const [reEnterPassword, setReEnterPassword] = useState('')
    const [changeName, setChangeName] = useState('')
    const [deleteAccError, setDeleteAccError] = useState('')
    const [pfpErrorMessage, setPFPErrorMessage] = useState(null)

    const [userPFP, setUserPFP] = useState(currentUser.pfp);

    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();
    }, []);

    // Changes the user's profile picture. If the selected image's uri is over 1048487 bytes (approximately 1.04 MB) then the image will not save.
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.cancelled) {
            setUserPFP(result.uri);
            setPFPErrorMessage(null);
        }

        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).update({
            pfp: result.uri
        }).catch(() => {   
            setPFPErrorMessage("There was an error with saving your profile picture. Did you upload a file larger than 700 KB?");
        })
    };

    const onLogout = () => {
        firebase.auth().signOut();
    }

    // Delete the user's account (DOES NOT WORK FOR GOOGLE USERS)
    const deleteUserAccount = () => {
        firebase.auth().currentUser.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(currentUser.email, reEnterPassword)).then(() => {
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).delete().then(() => {
                firebase.auth().currentUser.delete().then(() => {
                }).catch(() => {
                    setDeleteAccError("Your account could not be deleted. You shouldn't ever see this error.");
                })
            }).catch(() => {
                setDeleteAccError("This user's data could not be accessed. You shouldn't ever see this error.");
            })
        }).catch(() => {
            setDeleteAccError("Your password is either incorrect, or you do not have a password.");
        })
    }

    // TODO: Find out how to make this update in real time
    const changeUserName = () => {
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).update({
            name: changeName
        }).then(() => {
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).onSnapshot((doc) => {
                console.log("Name changed to " + changeName);
            })
        })
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Avatar.Image 
                        source={{
                            uri: userPFP,
                        }}
                        size={80}
                    />
                    <View style={{marginLeft: 20}}>
                        <Title style={[styles.title2, { marginTop: 15, marginBottom: 5,}]}>
                            {currentUser.name}
                        </Title>
                        <Caption style={styles.caption}>{currentUser.email}</Caption>
                    </View>
                </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => onLogout()}>
                        <Text style={styles.buttonTitleLogout}>Log out</Text>
                </TouchableOpacity>
                <Text onPress={() => deleteUserAccount()} style={{color: 'red', marginTop: 10}}>
                    Delete account
                </Text>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Re-enter your password'
                        onChangeText={(text) => setReEnterPassword(text)}
                        value={reEnterPassword}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <Text style={{margin: 10, color: 'red'}}>
                        {deleteAccError}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Change name'
                        onChangeText={(text) => setChangeName(text)}
                        value={changeName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => changeUserName()}>
                        <Text style={styles.buttonTitleLogout}>Change Name</Text>
                    </TouchableOpacity>
                    <View style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={pickImage}>
                                <Text style={styles.buttonTitleLogout}>Change profile picture</Text>
                        </TouchableOpacity>
                        <Text style={{marginTop: 10}}>
                            If you upload a image or gif larger than 700 KB, your profile picture may not save.
                        </Text>
                        <Text style={{margin: 10, color: 'red'}}>
                            {pfpErrorMessage}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
})
export default connect(mapStateToProps, null)(Profile);