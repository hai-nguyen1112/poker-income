import {
    FETCH_INCOME_START,
    FETCH_INCOME_SUCCESS,
    FETCH_INCOME_FAIL
} from "../actions/incomeActionTypes"
import {
    ADD_INCOME_START,
    ADD_INCOME_SUCCESS,
    ADD_INCOME_FAIL
} from "../actions/addIncomeActionTypes"
import {PERSISTED_STATE_WAS_RESET} from "../actions/clearPersistedStateActionTypes"
import {updateObject} from "../../helperFunctions/updateObject"

const initialState = {
    income: {},
    isLoadingIncome: false,
    loadIncomeError: null,
    isAddingIncome: false,
    addIncomeError: null
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
        loadIncomeError: null,
        isAddingIncome: false,
        addIncomeError: null
    })
}

const addIncomeStart = (state, action) => {
    return updateObject(state, {
        isAddingIncome: action.isAddingIncome,
        addIncomeError: action.addIncomeError
    })
}

const addIncomeSuccess = (state, action) => {
    return updateObject(state, {
        income: action.income,
        isAddingIncome: action.isAddingIncome,
        addIncomeError: action.addIncomeError
    })
}

const addIncomeFail = (state, action) => {
    return updateObject(state, {
        isAddingIncome: action.isAddingIncome,
        addIncomeError: action.addIncomeError
    })
}

export const incomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INCOME_START: return fetchIncomeStart(state, action)
        case FETCH_INCOME_SUCCESS: return fetchIncomeSuccess(state, action)
        case FETCH_INCOME_FAIL: return fetchIncomeFail(state, action)
        case PERSISTED_STATE_WAS_RESET: return clearPersistedState(state, action)
        case ADD_INCOME_START: return addIncomeStart(state, action)
        case ADD_INCOME_SUCCESS: return addIncomeSuccess(state, action)
        case ADD_INCOME_FAIL: return addIncomeFail(state, action)
        default: return state
    }
}