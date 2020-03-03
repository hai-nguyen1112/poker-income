import React from 'react'
import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import {connect} from 'react-redux'
import CallbackPage from './components/CallbackPage'
import {isEmpty} from 'lodash'
import Routes from './components/Routes'

const App = ({user}) => {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/callback" component={CallbackPage} />
                <Route path="/login" render={() => isEmpty(user) ? <LoginPage /> : <Redirect to="/" />} />
                <Route path="/" render={() => isEmpty(user) ? <Redirect to="/login" /> : <Routes />} />
                <Redirect from="*" to="/" />
            </Switch>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(App)
