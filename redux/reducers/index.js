import { combineReducers } from 'redux'
import { user } from './user'

// explanation of combineReducers(): https://redux.js.org/api/combinereducers
const Reducers = combineReducers({
    userState: user
})

export default Reducers