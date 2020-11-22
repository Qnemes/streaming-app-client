import React from 'react'
import { Link } from 'react-router-dom'
import GoogleAuth from './GoogleAuth'
import { ReactComponent as Logo } from '../img/LogoSingularity.svg'

const Header = () => {
    return (
        <div style={{display: "flex", alignItems: "center"}} className="ui secondary pointing menu">
            <Link to="/" className="item"><Logo/></Link>
            <div className="right menu">
                <Link to="/" className="item">All streams</Link>
                <GoogleAuth />
            </div>
        </div>
    )
}

export default Header
