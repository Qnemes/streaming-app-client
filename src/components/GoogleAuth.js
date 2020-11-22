import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

require('dotenv').config()
class GoogleAuth extends Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: `95229173169-jmh1m1j1f0fh13ktr5v01d4dct0h6fam.apps.googleusercontent.com`,
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId())
        } else {
            this.props.signOut()
        }
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return (
                <div className="ui centered active inline loader"></div>
            )
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={() => this.auth.signOut()} className="ui red google button">
                    <i className="google icon" />Log out
                </button>
            )
        } else {
            return (
                <button onClick={() => this.auth.signIn()} className="ui blue google button">
                    <i className="google icon" />Log In
                </button>
            )
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)