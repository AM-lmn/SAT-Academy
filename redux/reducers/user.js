import { USER_STATE_CHANGE, CLEAR_DATA, USER_TESTS_COMPLETED_STATE_CHANGE } from "../constants"

// initialState will always be how the app first loads, as there is a split second
// where the computer processes the code that actually defines the user
const initialState = {
    currentUser: null,
    completedTests: []
}

// The actions dispatched from actions/index.js will take effect here in the user's data
export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case CLEAR_DATA:
            return initialState
        case USER_TESTS_COMPLETED_STATE_CHANGE:
            return {
                ...state,
                completedTests: action.completedTests
            }
        default:
            return state;
    }
}