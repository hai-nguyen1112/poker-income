import {
    FETCH_INCOME_START,
    FETCH_INCOME_SUCCESS,
    FETCH_INCOME_FAIL
} from "../actions/incomeActionTypes"
import {PERSISTED_STATE_WAS_RESET} from "../actions/clearPersistedStateActionTypes"
import {updateObject} from "../../helperFunctions/updateObject"

const initialState = {
    income: {},
    isLoadingIncome: false,
    loadIncomeError: null
}

const fetchIncomeStart = (state, action) => {
    return updateObject(state, {
        isLoadingIncome: action.isLoadingIncome,
        loadIncomeError: action.loadIncomeError
    })
}

const fetchIncomeSuccess = (state, action) => {
    return updateObject(state, {
        income: action.income,
        isLoadingIncome: action.isLoadingIncome,
        loadIncomeError: action.loadIncomeError
    })
}

const fetchIncomeFail = (state, action) => {
    return updateObject(state, {
        isLoadingIncome: action.isLoadingIncome,
        loadIncomeError: action.loadIncomeError
    })
}

const clearPersistedState = (state, action) => {
    return updateObject(state, {
        income: {},
        isLoadingIncome: false,
        loadIncomeError: null
    })
}

export const incomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INCOME_START: return fetchIncomeStart(state, action)
        case FETCH_INCOME_SUCCESS: return fetchIncomeSuccess(state, action)
        case FETCH_INCOME_FAIL: return fetchIncomeFail(state, action)
        case PERSISTED_STATE_WAS_RESET: return clearPersistedState(state, action)
        default: return state
    }
}