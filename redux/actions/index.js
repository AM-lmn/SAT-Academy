import { USER_STATE_CHANGE, CLEAR_DATA } from '../constants/index'
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