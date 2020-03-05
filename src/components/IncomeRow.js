import React, {useState, useCallback} from 'react'
import EditIncomeForm from "./EditIncomeForm"

const IncomeRow = ({index, tour}) => {
    const [clickedEdit, setClickedEdit] = useState(false)

    const handleShowEditForm = useCallback(() => {
        setClickedEdit(!clickedEdit)
    }, [clickedEdit])

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
                            <button>Delete</button>
                        </td>
                    </tr>
            }
        </>
    )
}

export default IncomeRow