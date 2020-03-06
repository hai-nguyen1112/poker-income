import React, {useCallback, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import {connect} from 'react-redux'
import userManager from '../utils/userManager'
import {removeUser} from "../redux/actions/userActions"
import {fetchIncome} from "../redux/actions/incomeActions"
import {clearPersistedState} from "../redux/actions/clearPersistedStateActions"
import Loading from "../helperComponents/Loading"
import ErrorMessage from "../helperComponents/ErrorMessage"
import {isEmpty} from 'lodash'
import AddIncomeForm from "./AddIncomeForm"
import IncomeRow from "./IncomeRow"

const HomePage = ({user, removeUser, income, isLoadingIncome, loadIncomeError, fetchIncome, clearPersistedState, isAddingIncome, addIncomeError}) => {
    const handleSignOut = useCallback(e => {
        e.preventDefault()
        removeUser()
        clearPersistedState()
        userManager.removeUser()
    }, [removeUser, clearPersistedState])

    useEffect(() => {
        fetchIncome(user.profile.email)
    }, [fetchIncome, user.profile.email])

    let rows
    if (!isEmpty(income) && !income.new_user) {
        rows = income.tours.sort((a, b) => {
            var dateA = new Date(a.cash_date)
            var dateB = new Date(b.cash_date)
            return dateB - dateA
        })
            .map((tour, index) => (
                <IncomeRow key={index} index={index} tour={tour} />
            ))
    }

    return (
        <>
            {
                isLoadingIncome || isAddingIncome
                    ?
                    <Loading/>
                    :
                    !isEmpty(loadIncomeError) || !isEmpty(addIncomeError)
                        ?
                        <ErrorMessage/>
                        :
                        <Container fluid>
                            <Row style={{background: "rgb(244, 206, 96)", fontFamily: "'Sigmar One', cursive", color: "rgb(205, 90, 75"}}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <h1>
                                        Poker Income Tracker
                                    </h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={4} lg={4} xl={4} style={{padding: "5px 0 5px 0", background: "rgb(83, 159, 101)", fontFamily: "'Muli', sans-serif", color: "white", fontSize: "20px"}}>
                                    Welcome {user.profile.name}!
                                </Col>
                                <Col xs={12} sm={12} md={4} lg={4} xl={4} style={{padding: "5px 0 5px 0", background: "rgb(205, 90, 75)", fontFamily: "'Muli', sans-serif", color: "white", fontSize: "20px"}}>
                                    Up-to-Date Income: ${income.new_user ? 0 : income.acc_inc}
                                </Col>
                                <Col xs={12} sm={12} md={4} lg={4} xl={4} style={{padding: "5px 0 5px 0", background: "rgb(70, 125, 219)", fontFamily: "'Muli', sans-serif", color: "white", fontSize: "20px"}}>
                                    <button style={{background: "transparent", border: "none", padding: "0!important", color: "white", textDecoration: "underline", cursor: "pointer"}} onClick={handleSignOut}>Log Out</button>
                                </Col>
                            </Row>
                            <Row style={{background: "rgb(244, 206, 96)", padding: "20px 0 10px 0"}}>
                                <Col>
                                    <AddIncomeForm />
                                </Col>
                            </Row>
                            <Row style={{background: "rgb(244, 206, 96)", padding: "10px 0 10px 0"}}>
                                <Col>
                                    {
                                        income.new_user
                                            ?
                                            <p style={{textAlgin: "center", fontFamily: "'Fredoka One', cursive", color: "rgb(227, 84, 122)"}}>
                                                You don't have any income. Start to add income.
                                            </p>
                                            :
                                            <Table size="sm" responsive striped={true} variant="dark" bordered={true} style={{minWidth: "1100px"}}>
                                                <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Casino</th>
                                                    <th>Tournament</th>
                                                    <th>Buy-in</th>
                                                    <th>Add-on</th>
                                                    <th>Placement</th>
                                                    <th>Earning</th>
                                                    <th></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {rows}
                                                </tbody>
                                            </Table>
                                    }
                                </Col>
                            </Row>
                        </Container>
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        income: state.income.income,
        isLoadingIncome: state.income.isLoadingIncome,
        loadIncomeError: state.income.loadIncomeError,
        isAddingIncome: state.income.isAddingIncome,
        addIncomeError: state.income.addIncomeError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeUser: () => dispatch(removeUser()),
        fetchIncome: email => dispatch(fetchIncome(email)),
        clearPersistedState: () => dispatch(clearPersistedState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)