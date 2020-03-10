import {
    FETCH_INCOME_START,
    FETCH_INCOME_SUCCESS,
    FETCH_INCOME_FAIL
} from "./incomeActionTypes"
import axios from '../../utils/axiosInstance'
import {isEmpty} from 'lodash'

export const fetchIncome = email => {
    return dispatch => {
        dispatch(fetchIncomeStart())
        axios({
            url: "/incomes",
            method: "GET"
        })
            .then(response => {
                let income = response.data.find(income => income.email === email)
                if (!isEmpty(income)) {
                    income["new_user"] = false
                    income["tours"] = JSON.parse(income["tours"])
                    dispatch(fetchIncomeSuccess(income))
                } else {
                    dispatch(fetchIncomeSuccess({new_user: true}))
                }
            })
            .catch(error => dispatch(fetchIncomeFail(error)))
    }
}

const fetchIncomeStart = () => {
    return {
        type: FETCH_INCOME_START,
        isLoadingIncome: true,
        loadIncomeError: null
    }
}

const fetchIncomeSuccess = income => {
    return {
        type: FETCH_INCOME_SUCCESS,
        isLoadingIncome: false,
        loadIncomeError: null,
        income: income
    }
}

const fetchIncomeFail = error => {
    return {
        type: FETCH_INCOME_FAIL,
        isLoadingIncome: false,
        loadIncomeError: error
    }
}