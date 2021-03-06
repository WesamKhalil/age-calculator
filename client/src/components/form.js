import React, { Component } from 'react'
import axios from 'axios'
import './form.css'

export class Form extends Component {
    constructor(props) {
        super(props)

        //Name and date, is given a value when form is repurposed to edit existing documents of users and their ages
        this.state = {
            name: '',
            date: '',
            hours: null
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const name = e.target.name.value
        const date = e.target.date.value
        const hours = e.target.hours.value || 0

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
            await axios.put("/api/userAges/" + this.props.match.params.id, { name, date, hours })
        } else {
            await axios.post("/api/userAges", { name, date, hours })
        }

        //Redirects us to the List page and component after posting/editing
        this.props.history.push("/list")
    }

    //Checks if we're using form for editing, if we are using it for editing then sets state for name and date to the same values in the document we're editing
    //If user refreshes the browser then we fetch the data, we don't fetch the data the first time round to avoid unnecessary API calls
    //You'll see the name and date of the document being edited on initial load
    async componentDidMount() {
        if(this.props.location.name) {
            this.setState({
                name: this.props.location.name,
                date: this.props.location.date,
                hours: this.props.location.hours
            })
        } else if(this.props.match.params.id) {
            const user = await (await axios.get("/api/userAges/individual/" + this.props.match.params.id)).data.user

            this.setState({
                name: user.name,
                date: user.date.slice(0, 10),
                hours: user.hours
            })
        }
    }

    render() {
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="name" className="form-input" defaultValue={this.state.name} placeholder="Name" autoComplete="off" required/>
                    <input type="number" name="hours" className="form-input" defaultValue={this.state.hours} placeholder="Hour you were born (optional)" min="0" max="23"/>
                    <input type="date" name="date" className="form-input" defaultValue={this.state.date} required/>
                    <button className="form-btn">Calculate Age</button>
                </form>
            </div>
        )
    }
}

export default Form
