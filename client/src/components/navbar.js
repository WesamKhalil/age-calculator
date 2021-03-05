import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

//NavBar with a burger button made from pure css that utilises a toggler input
export class NavBar extends Component {
    render() {
        return (
            <nav>
                <input type="checkbox" className="toggler" />
                <div className="burger">
                    <div className="first-bar"></div>
                    <div className="second-bar"></div>
                    <div className="third-bar"></div>
                </div>
                <div className="menu">
                    <h1><Link to="/" className="nav-btn">Get Age</Link></h1>
                    <h1><Link to="/list" className="nav-btn">List</Link></h1>
                </div>
            </nav>
        )
    }
}

export default NavBar
