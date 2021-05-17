import { USER_STATE_CHANGE, CLEAR_DATA, USER_TESTS_COMPLETED_STATE_CHANGE } from "../constants"

const initialState = {
    currentUser: null,
    completedTests: []
}

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