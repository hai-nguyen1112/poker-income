import {STORE_VERIFIED_USER, REMOVE_USER} from "../actions/userActionTypes"
import {updateObject} from "../../helperFunctions/updateObject"

const storeVefiredUser = (state, action) => {
    return updateObject(state, action.user)
}

const removeUser = (state, action) => {
    return {}
}

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case STORE_VERIFIED_USER: return storeVefiredUser(state, action)
        case REMOVE_USER: return removeUser(state, action)
        default: return state
    }
}