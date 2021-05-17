import { USER_STATE_CHANGE, CLEAR_DATA, USER_TESTS_COMPLETED_STATE_CHANGE } from '../constants/index'
import firebase from 'firebase'

export function clearData() {
    return ((dispatch) => {
        dispatch({type: CLEAR_DATA})
    })
}

export function fetchUser(){
    return((dispatch) => {
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get().then((snapshot) => {
            if(snapshot.exists){
                dispatch({type : USER_STATE_CHANGE, currentUser: snapshot.data()})
            } else {
                window.alert("User data could not be retrieved. Contact app administrator if you see this error.");
            }
        })
    })
}

export function fetchUserCompletedTests(){
    return((dispatch) => {
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("scores").get().then((snapshot) => {
            let completedTests = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            })
            dispatch({ type: USER_TESTS_COMPLETED_STATE_CHANGE, completedTests})
        })
    })
}