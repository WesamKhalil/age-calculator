import React, { Component } from 'react'
import axios from 'axios'
import './form.css'

export class Form extends Component {
    constructor(props) {
        super(props)

        //Name and date, is given a value when form is repurposed to edit existing documents of users and their ages
        this.state = {
            name: '',
            date: ''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const name = e.target.name.value
        const date = e.target.date.value

        //Checks if the user date is too large or too small
        if(new Date(date) > new Date()) {
            alert("What are you, a time traveller?")
            return
        } else if(new Date().getFullYear() - parseInt(date.slice(0, 4)) > 117) {
            alert("You belong in a museum.")
            return
        }

        //Checks if we're submitting an edit or a post
        if(this.props.location.name) {
            await axios.put("http://localhost:3000/api/userAges/" + this.props.match.params.id, { name, date })
        } else {
            await axios.post("http://localhost:3000/api/userAges/", { name, date })
        }

        //Redirects us to the List page and component after posting/editing
        this.props.history.push("/list")
    }

    //Checks if we're using form for editing, if we are using it for editing then sets state for name and date to the same values in the document we're editing
    //You'll see the name and date of the document being edited on initial load
    componentDidMount() {
        if(this.props.location.name) {
            console.log(this.props.location.name, this.props.location.date)
            this.setState({
                name: this.props.location.name,
                date: this.props.location.date,
            })
        }
    }

    render() {
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="name" className="form-input" defaultValue={this.state.name} required/>
                    <input type="date" name="date" className="form-input" defaultValue={this.state.date} required/>
                    <button>Get Age</button>
                </form>
            </div>
        )
    }
}

export default Form
