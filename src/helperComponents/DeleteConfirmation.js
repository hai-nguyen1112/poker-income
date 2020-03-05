import React, {useCallback} from 'react'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import {addIncome} from '../redux/actions/addIncomeActions'

const DeleteConfirmation = ({show, onHide, index, deleteIncome, tour, income}) => {
    const handleDeleteIncome = useCallback(() => {
        let updatedTours = JSON.parse(JSON.stringify(income.tours))
        updatedTours.splice(index, 1)
        let deleteData = {}
        deleteData["acc_inc"] = income.acc_inc - (tour.earning - tour.buy_in - tour.add_on)
        deleteData["tours"] = updatedTours
        deleteIncome(income.id, deleteData)
    }, [income.acc_inc, income.tours, index, tour.add_on, tour.buy_in, tour.earning, deleteIncome, income.id])

    return (
        <Modal
            show={show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop={'static'}
            animation={false}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Confirmation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Are you sure you want to delete this entry?
            </Modal.Body>
            <Modal.Footer style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Button
                    variant="warning"
                    onClick={onHide}
                    style={{color: "white"}}
                >
                    No
                </Button>
                <Button
                    variant="danger"
                    onClick={() => {
                        handleDeleteIncome()
                        onHide()
                    }}
                >
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        income: state.income.income
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteIncome: (...data) => dispatch(addIncome(...data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirmation)