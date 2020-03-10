import {
    ADD_INCOME_START,
    ADD_INCOME_SUCCESS,
    ADD_INCOME_FAIL
} from "./addIncomeActionTypes"
import axios from '../../utils/axiosInstance'
import store from '../store'

export const addIncome = (...data) => {
    return dispatch => {
        dispatch(addIncomeStart())
        if (!store.getState().income.income.new_user) {
            axios({
                url: `/incomes/${data[0]}`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                data: {...data[1]}
            })
                .then(response => {
                    let income = response.data
                    income["tours"] = JSON.parse(income["tours"])
                    dispatch(addIncomeSuccess(income))
                })
                .catch(error => dispatch(addIncomeFail(error)))
        } else {
            axios({
                url: "/incomes",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                data: {...data[0]}
            })
                .then(response => {
                    let income = response.data.income
                    income["tours"] = JSON.parse(income["tours"])
                    dispatch(addIncomeSuccess(income))
                })
                .catch(error => dispatch(addIncomeFail(error)))
        }
    }
}

const addIncomeStart = () => {
    return {
        type: ADD_INCOME_START,
        isAddingIncome: true,
        addIncomeError: null
    }
}

const addIncomeSuccess = income => {
    return {
        type: ADD_INCOME_SUCCESS,
        isAddingIncome: false,
        addIncomeError: null,
        income: income
    }
}

const addIncomeFail = error => {
    return {
        type: ADD_INCOME_FAIL,
        isAddingIncome: false,
        addIncomeError: error
    }
}