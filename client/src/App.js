import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './components/navbar'
import Form from './components/form'
import List from './components/list'
import './App.css'

export class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <NavBar />
                    <Route exact path="/" component={Form} />
                    <Route exact path="/list" component={List} />
                    <Route path="/edit/:id" component={Form}/>
                </div>
            </Router>
        )
    }
}

export default App
