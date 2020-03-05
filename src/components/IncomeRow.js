import React, {useState, useCallback} from 'react'
import EditIncomeForm from "./EditIncomeForm"
import DeleteConfirmation from "../helperComponents/DeleteConfirmation"

const IncomeRow = ({index, tour}) => {
    const [clickedEdit, setClickedEdit] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const handleShowEditForm = useCallback(() => {
        setClickedEdit(!clickedEdit)
    }, [clickedEdit])

    const handleClickDelete = useCallback(() => {
        setShowConfirm(!showConfirm)
    }, [showConfirm])

    return (
        <>
            {
                clickedEdit
                    ?
                    <EditIncomeForm index={index} tour={tour} handleShowEditForm={handleShowEditForm}/>
                    :
                    <tr key={index}>
                        <td>{tour.cash_date}</td>
                        <td>{tour.casino}</td>
                        <td>{tour.tour}</td>
                        <td>{tour.buy_in}</td>
                        <td>{tour.add_on}</td>
                        <td>{tour.placement}</td>
                        <td>{tour.earning}</td>
                        <td>
                            <button onClick={handleShowEditForm}>Edit</button>
                            &nbsp;
                            &nbsp;
                            <button onClick={handleClickDelete}>Delete</button>
                            <DeleteConfirmation
                                show={showConfirm}
                                onHide={handleClickDelete}
                                index={index}
                                tour={tour}
                            />
                        </td>
                    </tr>
            }
        </>
    )
}

export default IncomeRow