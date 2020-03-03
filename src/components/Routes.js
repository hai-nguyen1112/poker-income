import React, {Component} from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import HomePage from './HomePage'

class Routes extends Component {

    componentDidMount() {
        this.props.history.push("/home")
    }

    render() {
        return (
            <Switch>
                <Route path="/home" component={HomePage} />
            </Switch>
        )
    }
}

export default withRouter(Routes)