import React, {useState, useCallback, useRef, useEffect} from 'react'
import positiveNumberValidation from "../helperFunctions/positiveNumberValidation"
import integerInputValidation from "../helperFunctions/integerInputValidation"
import convertDate1 from "../helperFunctions/convertDate1"
import {isEmpty} from 'lodash'
import convertDate from "../helperFunctions/convertDate"
import {connect} from 'react-redux'
import {addIncome} from "../redux/actions/addIncomeActions"

const EditIncomeForm = ({index, tour, handleShowEditForm, income, editIncome}) => {
    const [date, setDate] = useState(convertDate1(tour.cash_date))
    const [casino, setCasino] = useState(tour.casino)
    const [tournament, setTournament] = useState(tour.tour)
    const [buyIn, setBuyIn] = useState(tour.buy_in)
    const [addOn, setAddOn] = useState(tour.add_on)
    const [placement, setPlacement] = useState(tour.placement)
    const [earning, setEarning] = useState(tour.earning)
    const submitRef = useRef()
    const casinoRef = useRef()

    const handleSubmit = useCallback(e => {
        e.preventDefault()
        let updatedTours = income.tours.map((tour, i) => {
            if (i !== index) {
                return tour
            } else {
                return {
                    "casino": casino,
                    "tour": tournament,
                    "cash_date": convertDate(date),
                    "buy_in": buyIn,
                    "add_on": addOn,
                    "placement": placement,
                    "earning": earning
                }
            }
        })
        let editData = {}
        let difference = earning - buyIn - addOn - (tour.earning - tour.buy_in - tour.add_on)
        editData["acc_inc"] = income.acc_inc + difference
        editData["tours"] = JSON.stringify(updatedTours)
        editIncome(income.id, editData)
    }, [date, casino, tournament, buyIn, addOn, placement, earning, index, income.tours, editIncome, income.acc_inc, income.id, tour.add_on, tour.buy_in, tour.earning])

    useEffect(() => {
        if (
            (date !== convertDate1(tour.cash_date) && !isEmpty(date) && casino !== "" && tournament !== "" && buyIn !== "" && addOn !== "" && placement !== "" && earning!== "")
            ||
            (casino !== tour.casino && !isEmpty(date) && casino !== "" && tournament !== "" && buyIn !== "" && addOn !== "" && placement !== "" && earning!== "")
            ||
            (tournament !== tour.tour && !isEmpty(date) && casino !== "" && tournament !== "" && buyIn !== "" && addOn !== "" && placement !== "" && earning!== "")
            ||
            (buyIn !== tour.buy_in && !isEmpty(date) && casino !== "" && tournament !== "" && buyIn !== "" && addOn !== "" && placement !== "" && earning!== "")
            ||
            (addOn !== tour.add_on && !isEmpty(date) && casino !== "" && tournament !== "" && buyIn !== "" && addOn !== "" && placement !== "" && earning!== "")
            ||
            (placement !== tour.placement && !isEmpty(date) && casino !== "" && tournament !== "" && buyIn !== "" && addOn !== "" && placement !== "" && earning!== "")
            ||
            (earning !== tour.earning && !isEmpty(date) && casino !== "" && tournament !== "" && buyIn !== "" && addOn !== "" && placement !== "" && earning!== "")
        ) {
            submitRef.current.removeAttribute("disabled")
        } else {
            submitRef.current.setAttribute("disabled", true)
        }
    }, [date, casino, tournament, buyIn, addOn, placement, earning, tour.cash_date, tour.casino, tour.tour, tour.buy_in, tour.add_on, tour.placement, tour.earning])

    return (
        <tr key={index}>
            <td>
                <input
                    style={{fontFamily: "'Nanum Myeongjo', cursive", maxWidth: "200px"}}
                    required
                    type="date"
                    max={new Date().toISOString().slice(0, 10)}
                    value={date}
                    onChange={useCallback(e => setDate(e.target.value), [])}
                />
            </td>
            <td>
                <input
                    style={{fontFamily: "'Nanum Myeongjo', cursive", maxWidth: "150px"}}
                    ref={casinoRef}
                    required
                    type="text"
                    maxLength="50"
                    value={casino}
                    onChange={useCallback(e => setCasino(e.target.value), [])}
                />
            </td>
            <td>
                <input
                    style={{fontFamily: "'Nanum Myeongjo', cursive", maxWidth: "150px"}}
                    required
                    type="text"
                    maxLength="100"
                    value={tournament}
                    onChange={useCallback(e => setTournament(e.target.value), [])}
                />
            </td>
            <td>
                <input
                    style={{fontFamily: "'Nanum Myeongjo', cursive", maxWidth: "80px"}}
                    required
                    type="number"
                    min="0"
                    value={buyIn}
                    onChange={useCallback(e => {
                        if (e.target.value !== "") {
                            setBuyIn(parseInt(e.target.value, 10))
                        } else {
                            setBuyIn(e.target.value)
                        }
                    }, [])}
                    onKeyDown={useCallback(e => positiveNumberValidation(e), [])}
                />
            </td>
            <td>
                <input
                    style={{fontFamily: "'Nanum Myeongjo', cursive", maxWidth: "80px"}}
                    required
                    type="number"
                    min="0"
                    value={addOn}
                    onChange={useCallback(e => {
                        if (e.target.value !== "") {
                            setAddOn(parseInt(e.target.value, 10))
                        } else {
                            setAddOn(e.target.value)
                        }
                    }, [])}
                    onKeyDown={useCallback(e => positiveNumberValidation(e), [])}
                />
            </td>
            <td>
                <input
                    style={{fontFamily: "'Nanum Myeongjo', cursive", maxWidth: "80px"}}
                    required
                    type="number"
                    min="1"
                    step="1"
                    value={placement}
                    onChange={useCallback(e => {
                        if (e.target.value !== "") {
                            setPlacement(parseInt(e.target.value, 10))
                        } else {
                            setPlacement(e.target.value)
                        }
                    }, [])}
                    onKeyDown={useCallback(e => integerInputValidation(e), [])}
                />
            </td>
            <td>
                <input
                    style={{fontFamily: "'Nanum Myeongjo', cursive", maxWidth: "80px"}}
                    required
                    type="number"
                    min="0"
                    value={earning}
                    onChange={useCallback(e => {
                        if (e.target.value !== "") {
                            setEarning(parseInt(e.target.value, 10))
                        } else {
                            setEarning(e.target.value)
                        }
                    }, [])}
                    onKeyDown={useCallback(e => positiveNumberValidation(e), [])}
                />
            </td>
            <td>
                <button style={{background: "transparent", border: "none", padding: "0!important", color: "white", textDecoration: "underline", cursor: "pointer"}} ref={submitRef} onClick={handleSubmit}>Submit</button>
                &nbsp;
                &nbsp;
                <button style={{background: "transparent", border: "none", padding: "0!important", color: "white", textDecoration: "underline", cursor: "pointer"}} onClick={handleShowEditForm}>Cancel</button>
            </td>
        </tr>
    )
}

const mapStateToProps = state => {
    return {
        income: state.income.income
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editIncome: (...data) => dispatch(addIncome(...data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditIncomeForm)