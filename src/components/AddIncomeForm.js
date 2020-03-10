import React, {useState, useCallback, useRef, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Collapse from 'react-bootstrap/Collapse'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import integerInputValidation from "../helperFunctions/integerInputValidation"
import positiveNumberValidation from "../helperFunctions/positiveNumberValidation"
import {connect} from 'react-redux'
import {addIncome} from "../redux/actions/addIncomeActions"
import convertDate from "../helperFunctions/convertDate"

const AddIncomeForm = ({user, income, addIncome}) => {
    const [open, setOpen] = useState(false)
    const [validated, setValidated] = useState(false)
    const [date, setDate] = useState("")
    const [casino, setCasino] = useState("")
    const [tournament, setTournament] = useState("")
    const [buyIn, setBuyIn] = useState("")
    const [addOn, setAddOn] = useState("")
    const [placement, setPlacement] = useState("")
    const [earning, setEarning] = useState("")
    const submitRef = useRef()

    useEffect(() => {
        date === ""
        ||
        casino === ""
        ||
        tournament === ""
        ||
        buyIn === ""
        ||
        addOn === ""
        ||
        placement === ""
        ||
        earning === ""
            ?
            submitRef.current.setAttribute("disabled", true)
            :
            submitRef.current.removeAttribute("disabled")
    }, [date, casino, tournament, buyIn, addOn, placement, earning])

    const clearState = useCallback(() => {
        setValidated(false)
        setDate("")
        setCasino("")
        setTournament("")
        setBuyIn("")
        setAddOn("")
        setPlacement("")
        setEarning("")
    }, [])

    const handleClickOfPanel = useCallback(() => {
        setOpen(!open)
        if (open) {
            clearState()
        }
    }, [open, clearState])

    const handleSubmit = useCallback(e => {
        e.preventDefault()
        const form = e.currentTarget
        let addData = {}
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        } else {
            if (!income.new_user) {
                let tours = JSON.parse(JSON.stringify(income.tours))
                tours[tours.length] = {
                    "casino": casino,
                    "tour": tournament,
                    "cash_date": convertDate(date),
                    "buy_in": buyIn,
                    "add_on": addOn,
                    "placement": placement,
                    "earning": earning
                }
                addData["acc_inc"] = income.acc_inc + earning - buyIn - addOn
                addData["tours"] = JSON.stringify(tours)
                addIncome(income.id, addData)
                handleClickOfPanel()
            } else {
                addData["email"] = user.profile.email
                addData["acc_inc"] = earning - buyIn - addOn
                addData["tours"] = JSON.stringify([{
                    "casino": casino,
                    "tour": tournament,
                    "cash_date": convertDate(date),
                    "buy_in": buyIn,
                    "add_on": addOn,
                    "placement": placement,
                    "earning": earning
                }])
                addIncome(addData)
                handleClickOfPanel()
            }
        }
        setValidated(true)
    }, [date, casino, tournament, buyIn, addOn, placement, earning, income, user, addIncome, handleClickOfPanel])

    return (
        <Card>
            <Card.Header
                onClick={handleClickOfPanel}
                style={{cursor: "pointer", background: "rgb(227, 84, 122)", color: "white"}}
            >
                <h4 style={{
                    fontFamily: "'Rubik', sans-serif",
                    margin: "-5px",
                    display: "flex",
                    justifyContent: "flex-start"
                }}>
                    {
                        open
                            ?
                            <i className="fas fa-arrow-circle-up"></i>
                            :
                            <i className="fas fa-arrow-circle-down"></i>
                    }
                    &nbsp;
                    Add Tournament/Cash
                </h4>
            </Card.Header>
            <Collapse in={open} style={{background: "rgb(227, 84, 122)", color: "white"}}>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} xs="12" sm="12" md="12" lg="3" xl="3"
                                        style={{textAlign: "left"}}>
                                <Form.Label style={{fontFamily: "'Josefin Sans', sans-serif", fontSize: "20px"}}>Tournament Date</Form.Label>
                                <Form.Control
                                    style={{fontFamily: "'Nanum Myeongjo', cursive"}}
                                    required
                                    type="date"
                                    max={new Date().toISOString().slice(0, 10)}
                                    placeholder="Enter tournament/game date..."
                                    value={date}
                                    onChange={useCallback(e => setDate(e.target.value), [])}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Can't choose a future date.
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>
                                    Looks good!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} xs="12" sm="12" md="12" lg="3" xl="3"
                                        style={{textAlign: "left"}}>
                                <Form.Label style={{fontFamily: "'Josefin Sans', sans-serif", fontSize: "20px"}}>Casino</Form.Label>
                                <Form.Control
                                    style={{fontFamily: "'Nanum Myeongjo', cursive"}}
                                    required
                                    type="text"
                                    maxLength="50"
                                    placeholder="Enter casino name..."
                                    value={casino}
                                    onChange={useCallback(e => setCasino(e.target.value), [])}
                                />
                                <Form.Control.Feedback>
                                    Looks good!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} xs="12" sm="12" md="12" lg="3" xl="3"
                                        style={{textAlign: "left"}}>
                                <Form.Label style={{fontFamily: "'Josefin Sans', sans-serif", fontSize: "20px"}}>Tournament</Form.Label>
                                <Form.Control
                                    style={{fontFamily: "'Nanum Myeongjo', cursive"}}
                                    required
                                    type="text"
                                    maxLength="100"
                                    placeholder="Enter tournament name..."
                                    value={tournament}
                                    onChange={useCallback(e => setTournament(e.target.value), [])}
                                />
                                <Form.Control.Feedback>
                                    Looks good!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} xs="12" sm="12" md="12" lg="3" xl="3"
                                        style={{textAlign: "left"}}>
                                <Form.Label style={{fontFamily: "'Josefin Sans', sans-serif", fontSize: "20px"}}>Buy-in</Form.Label>
                                <Form.Control
                                    style={{fontFamily: "'Nanum Myeongjo', cursive"}}
                                    required
                                    type="number"
                                    min="0"
                                    placeholder="Enter buy-in amount..."
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
                                <Form.Control.Feedback>
                                    Looks good!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} xs="12" sm="12" md="12" lg="3" xl="3"
                                        style={{textAlign: "left"}}>
                                <Form.Label style={{fontFamily: "'Josefin Sans', sans-serif", fontSize: "20px"}}>Add-on</Form.Label>
                                <Form.Control
                                    style={{fontFamily: "'Nanum Myeongjo', cursive"}}
                                    required
                                    type="number"
                                    min="0"
                                    placeholder="Enter add-on amount..."
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
                                <Form.Control.Feedback>
                                    Looks good!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} xs="12" sm="12" md="12" lg="3" xl="3"
                                        style={{textAlign: "left"}}>
                                <Form.Label style={{fontFamily: "'Josefin Sans', sans-serif", fontSize: "20px"}}>Placement</Form.Label>
                                <Form.Control
                                    style={{fontFamily: "'Nanum Myeongjo', cursive"}}
                                    required
                                    type="number"
                                    min="1"
                                    step="1"
                                    placeholder="Enter your finish rank..."
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
                                <Form.Control.Feedback>
                                    Looks good!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} xs="12" sm="12" md="12" lg="3" xl="3"
                                        style={{textAlign: "left"}}>
                                <Form.Label style={{fontFamily: "'Josefin Sans', sans-serif", fontSize: "20px"}}>Earning</Form.Label>
                                <Form.Control
                                    style={{fontFamily: "'Nanum Myeongjo', cursive"}}
                                    required
                                    type="number"
                                    min="0"
                                    placeholder="Enter your cash amount..."
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
                                <Form.Control.Feedback>
                                    Looks good!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} xs="12" sm="12" md="12" lg="3" xl="3" style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "flex-end"
                            }}>
                                <Button type="submit" variant="light" ref={submitRef} style={{color: "rgb(227, 84, 122)", fontFamily: "'Fredoka One', cursive"}}>Submit</Button>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Card.Body>
            </Collapse>
        </Card>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        income: state.income.income
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIncome: (...data) => dispatch(addIncome(...data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddIncomeForm)