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
        const users = (await axios.get("/api/userAges/")).data.users

        console.log(users)

        const list = this.getAge(users)

        this.setState({list})
    }

    //Called on initial render, returns array of objects with all the values we need to display for list
    getAge = users => {

        const currentYear = String(new Date().getFullYear())
        const currentMonth = String(new Date().getMonth() + 1)
        const currentDay = String(new Date().getDate())
        //Time in milliseconds
        const currentTime = new Date().getTime()

        return users.map(({name, date, _id}) => {

            const userMonthAndDay = date.slice(4)
            const userYear = date.slice(0, 4)

            //Checking if the month and day of user is higher than the current date
            //Because of leap years a year can be either 365 days or 366 days so I'm checking based on dates and not time in milliseconds
            //For example 2020 is a leap year and has a 29th of February date, but 2019 isn't a leap year and doesn't have a 29th of February date
            //So if a baby was born on the 1st of March 2019 you'd expect them to be 1 years old on 1st of March 2020, but because 2020 is a leap year and has an extra day on 29th of February
            //365 days from their birthday would translate to the 29th of February and it would say that they are 1 years old on the 29th of February one day before their birthday
            let userDateIsLarger

            const userMonthIsEqual = parseInt(date.slice(5, 7)) === parseInt(currentMonth)
            if(userMonthIsEqual) {
                const userDayIsLargerOrEqual = parseInt(date.slice(8, 10)) >= parseInt(currentDay)
                userDateIsLarger = userDayIsLargerOrEqual
            } else {
                const userMonthIsLarger = parseInt(date.slice(5, 7)) > parseInt(currentMonth)
                userDateIsLarger = userMonthIsLarger
            }

            //Difference between current date and user date measured in milliseconds, excluding years
            //userDateIsLarger is a boolean but true = 1, and false = 0, so it will take away a year if true
            const timeDifference = currentTime - new Date((currentYear - userDateIsLarger) + userMonthAndDay).getTime()

            let years = currentYear - userYear - userDateIsLarger

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
        await axios.delete("/api/userAges/" + id)

        const newList = this.state.list.filter(({_id}) => _id !== id)

        this.setState({list: newList})
    }

    //Returns an object to a Link element where it will be used to repurpose our form component to edit our data
    editObject = (name, date, id) => {
        return {
            pathname: '/edit/' + id,
            name,
            date: date.slice(0, 10)
        }
    }

    render() {
        return (
            <div className="list">
                {
                    this.state.list.map(({name, date, dob, years, days, hours, _id}, index) => (
                        <div className="record-container" key={"record" + index}>
                            <div className="record">
                                <p><span style={{textDecoration: "underline"}}>Name:</span> {name}</p>
                                <p><span style={{textDecoration: "underline"}}>DOB:</span> {dob}</p>
                                <p><span style={{textDecoration: "underline"}}>Years:</span> {years}</p>
                                <p><span style={{textDecoration: "underline"}}>Days:</span> {days}</p>
                                <p><span style={{textDecoration: "underline"}}>Hours:</span> {hours}</p>
                            </div>
                            <button onClick={this.handleDelete} id={_id} className="delete">Delete</button>
                            <Link to={this.editObject(name, date, _id)}><button className="edit">Edit</button></Link>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default List 
