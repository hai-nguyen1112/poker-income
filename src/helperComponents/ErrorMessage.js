import React, {useCallback} from 'react'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import {connect} from 'react-redux'
import {clearPersistedState} from "../redux/actions/clearPersistedStateActions"
import {withRouter} from 'react-router-dom'
import {removeUser} from "../redux/actions/userActions"
import userManager from "../utils/userManager"

const ErrorMessage = ({history, clearPersistedState, removeUser}) => {
    const handleClickHere = useCallback(() => {
        clearPersistedState()
        removeUser()
        userManager.removeUser()
        history.push("/login")
    }, [history, clearPersistedState, removeUser])
    return (
        <Container
            fluid
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Alert variant="danger">
                <Alert.Heading>Oops, something went wrong!</Alert.Heading>
                <Alert.Link onClick={handleClickHere}>Click here</Alert.Link> to go back to the Login page.
            </Alert>
        </Container>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        clearPersistedState: () => dispatch(clearPersistedState()),
        removeUser: () => dispatch(removeUser())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(ErrorMessage))