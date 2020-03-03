import React from 'react'
import Image from 'react-bootstrap/Image'
import userManager from '../utils/userManager'
import Button from 'react-bootstrap/Button'

const LoginPage = () => {
    const onLoginButtonClick = e => {
        e.preventDefault()
        userManager.signinRedirect()
    }

    return (
        <>
            <header className="App-header">
                <Image
                    src='/poker-chips-favicon.png'
                    style={{maxWidth: '200px'}}
                />
                <br/>
                <p>
                    <code>A simple Poker Income Tracking App</code>
                </p>
                <Button
                    variant="primary"
                    onClick={onLoginButtonClick}
                >
                    Log in with Google
                </Button>
            </header>
        </>
    )
}

export default LoginPage