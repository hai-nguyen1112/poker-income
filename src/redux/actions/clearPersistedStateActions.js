import {PERSISTED_STATE_WAS_RESET} from "./clearPersistedStateActionTypes"

export const clearPersistedState = () => {
    return {
        type: PERSISTED_STATE_WAS_RESET
    }
}