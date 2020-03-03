import React, {useCallback} from 'react'
import {CallbackComponent} from 'redux-oidc'
import userManager from '../utils/userManager'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {storeVerifedUser} from "../redux/actions/userActions"

const CallbackPage = ({history, storeVerifiedUser}) => {

    const handleSuccessCallback = useCallback(user => {
        storeVerifiedUser(user)
        history.push("/")
    }, [storeVerifiedUser, history])

    const handleErrorCallback = useCallback(error => {
        console.log(error)
    }, [])

    return (
        <CallbackComponent
            userManager={userManager}
            successCallback={handleSuccessCallback}
            errorCallback={handleErrorCallback}
        >
            <div>Loading...</div>
        </CallbackComponent>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        storeVerifiedUser: user => dispatch(storeVerifedUser(user))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CallbackPage))