import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './list.css'

export class List extends Component {
    constructor(props) {
        super(props)

        //List is where we'll place names dates and times
        this.state = {
            list: []
        }
    }

    //Runs on initial render, fetches user data from back end api then passes it to the getAge function
    async componentDidMount() {
        const users = (await axios.get("http://localhost:3000/api/userAges/")).data.users

        console.log(users)

        const list = this.getAge(users)

        this.setState({list})
    }

    //Called on initial render, returns array of objects with all the values we need to display for list
    getAge = users => {

        const currentYear = String(new Date().getFullYear())
        //Time in milliseconds
        const currentTime = new Date().getTime()

        return users.map(({name, date, _id}) => {

            const userMonthAndDay = date.slice(4)
            const userYear = date.slice(0, 4)
            let years = currentYear - userYear

            //Check if the current date or user date has more milliseconds
            //We do it this way to account for leap years which could account for a little over 2% inaccuracy rate
            const userDateIsLarger = new Date(date).getTime() - new Date(userYear).getTime() > currentTime - new Date(currentYear).getTime()

            //Takes away a year if userDateIsLarger is true
            if(userDateIsLarger) years--

            //Difference between current date and user date measured in milliseconds, excluding years
            //userDateIsLarger is a boolean but true = 1, and false = 0, so it will take away a year if true
            const timeDifference = currentTime - new Date((currentYear - userDateIsLarger) + userMonthAndDay).getTime()

            const oneDay = 1000 * 60 * 60 * 24
            const days = Math.floor(timeDifference / oneDay)
            //const hours = Math.floor((timeDifference % oneDay) / (1000 * 60 * 60))
            const hours = parseInt(new Date().getHours())

            //Date of birth in a more readable format
            const dob = new Date(date).toString().slice(0, 15)

            //Object we'll use to render each recorded user and they're age
            return { name, date, dob, years, days, hours, _id }
        })
    }
    
    //Deletes document from database then removes targeted object from state so we don't see it
    handleDelete = async (e) => {

        const id = e.target.id
        await axios.delete("http://localhost:3000/api/userAges/" + id)

        const newList = this.state.list.filter(({_id}) => _id !== id)

        this.setState({list: newList})
    }

    //Returns an object to a Link element where it will be used to repurpose our form component to edit our data
    editObject = (name, date, id) => {
        return {
            pathname: '/edit-age/' + id,
            name,
            date: date.slice(0, 10)
        }
    }

    render() {
        return (
            <div className="list">
                {
                    this.state.list.map(({name, date, dob, years, days, hours, _id}, index) => (
                        <ol key={'ol' + index}>
                            <li>Name: {name}</li>
                            <li>DOB: {dob}</li>
                            <li>Years: {years}</li>
                            <li>Days: {days}</li>
                            <li>Hours: {hours}</li>
                            <button onClick={this.handleDelete} id={_id}>Delete</button>
                            <button><Link to={this.editObject(name, date, _id)}>Edit</Link></button>
                        </ol>
                    ))
                }
            </div>
        )
    }
}

export default List 
