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
            hours: null,
            error_message: null
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const name = e.target.name.value
        const date = e.target.date.value
        const hours = e.target.hours.value || 0
        const hourString = "0".repeat(hours < 10) + hours
        const dateAndHour = new Date(`${date}T${hourString}:00`)

        try {
            //Checks if we're submitting an edit or a post
            if(this.props.location.name) {
                await axios.put("/api/userAges/" + this.props.match.params.id, { name, date: dateAndHour })
            } else {
                await axios.post("/api/userAges", { name, date: dateAndHour })
            }
        } catch(error) {
            return this.setState({ error_message: error.response.data.error_message })
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
            console.log("laoding")
            const user = await (await axios.get("/api/userAges/individual/" + this.props.match.params.id)).data.user

            this.setState({
                name: user.name,
                date: user.date.slice(0, 10),
                hours: new Date(user.date).getHours()
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
                    {this.state.error_message ? (<div className="error-message">{this.state.error_message}</div>) : null}
                </form>
            </div>
        )
    }
}

export default Form
