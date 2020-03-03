import React, {useCallback} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import {connect} from 'react-redux'
import userManager from '../utils/userManager'
import {removeUser} from "../redux/actions/userActions"

const HomePage = ({user, removeUser}) => {
    const handleSignOut = useCallback(e => {
        e.preventDefault()
        removeUser()
        userManager.removeUser()
    }, [removeUser])

    return (
        <>
            <Container fluid>
                <Row style={{padding: "10px 0 0 0"}}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <h1>
                            Income Tracker
                        </h1>
                    </Col>
                </Row>
                <Row style={{padding: "0 0 20px 0"}}>
                    <Col xs={12} sm={4} md={4} lg={4} xl={4}>
                        Welcome, {user.profile.name}!
                    </Col>
                    <Col xs={12} sm={4} md={4} lg={4} xl={4}>

                    </Col>
                    <Col xs={12} sm={4} md={4} lg={4} xl={4}>
                        <button onClick={handleSignOut}>Log Out</button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Table heading</th>
                                <th>Table heading</th>
                                <th>Table heading</th>
                                <th>Table heading</th>
                                <th>Table heading</th>
                                <th>Table heading</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeUser: () => dispatch(removeUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)