import {combineReducers} from 'redux'
import {userReducer} from "./userReducer"
import {incomeReducer} from "./incomeReducer"

const rootReducer = combineReducers({
    user: userReducer,
    income: incomeReducer
})

export default rootReducer