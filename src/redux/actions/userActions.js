import {STORE_VERIFIED_USER, REMOVE_USER} from "./userActionTypes"

export const storeVerifedUser = user => {
    return {
        type: STORE_VERIFIED_USER,
        user: user
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}