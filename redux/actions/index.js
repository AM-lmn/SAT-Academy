import { USER_STATE_CHANGE, CLEAR_DATA, USER_TESTS_COMPLETED_STATE_CHANGE } from '../constants/index'
import firebase from 'firebase'

// When the user logs out, clear all of their data from showing up on the frontend so that other users do not see data that is not theirs
export function clearData() {
    return ((dispatch) => {
        dispatch({type: CLEAR_DATA})
    })
}

// Get the basic data of the user (name, email, target, pfp, etc), app will not load if this data is not present
export function fetchUser(){
    return((dispatch) => {
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get().then((snapshot) => {
            if(snapshot.exists){
                dispatch({type : USER_STATE_CHANGE, currentUser: snapshot.data()})
            } else {
                window.alert("data bad");
            }
        })
    })
}

// Return all of the user's completed tests. For new users, this will be an empty array when the app loads
export function fetchUserCompletedTests(){
    return((dispatch) => {
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("scores").orderBy("testScore", "desc").get().then((snapshot) => {
            let completedTests = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            })
            dispatch({ type: USER_TESTS_COMPLETED_STATE_CHANGE, completedTests})
        })
    })
}