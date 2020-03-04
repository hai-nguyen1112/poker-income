import React, {useEffect} from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import HomePage from './HomePage'

const Routes = ({history}) => {

    useEffect(() => {
        history.push("/home")
    }, [history])

    return (
        <Switch>
            <Route path="/home" component={HomePage}/>
        </Switch>
    )
}

export default withRouter(Routes)