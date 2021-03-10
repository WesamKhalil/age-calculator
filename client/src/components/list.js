import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './list.css'

export class List extends Component {
    constructor(props) {
        super(props)

        //List is where we'll place names dates and times
        this.state = {
            list: [],
            empty: false
        }
    }

    //Runs on initial render, fetches user data from back end api then passes it to the getAge function
    async componentDidMount() {
        const users = (await axios.get("/api/userAges")).data.users

        const list = this.getAge(users)

        this.setState({ list, empty: list.length === 0 })
    }

    //Called on initial render, returns array of objects with all the values we need to display for list
    getAge = users => {

        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()
        const currentMonth = currentDate.getMonth() + 1
        const currentDay = currentDate.getDate()
        const currentHour = currentDate.getHours()
        const currentMinute = currentDate.getMinutes()
        //Time in milliseconds
        const currentTime = currentDate.getTime()
        const currentDateTime = new Date(`${currentYear}-${currentMonth}-${currentDay}`).getTime()
        const offsetTime = currentDate.getTimezoneOffset() * 60 * 1000

        return users.map(({name, date, _id}) => {
            const utcUserTime = new Date(date).getTime()
            //Taking into account different time zones
            const userDate = new Date(utcUserTime - offsetTime)
            const userYear = userDate.getFullYear()
            const userMonth = userDate.getMonth() + 1
            const userDay = userDate.getDate()
            const userHour = userDate.getHours()
            const userMinute = userDate.getMinutes()

            //Checking if the month and day of user is higher than the current date
            //Because of leap years a year can be either 365 days or 366 days so I'm checking based on dates and not time in milliseconds
            //For example 2020 is a leap year and has a 29th of February date, but 2019 isn't a leap year and doesn't have a 29th of February date
            //So if a baby was born on the 1st of March 2019 you'd expect them to be 1 years old on 1st of March 2020, but because 2020 is a leap year 2020 has an extra day on 29th of February
            //365 days from their birthday would translate to the 29th of February and it would say that they are 1 years old on the 29th of February one day before their birthday
            let userDateIsLarger = false

            const dateComparison = [[userMonth, currentMonth], [userDay, currentDay], [userHour, currentHour], [userMinute, currentMinute]]

            // for(let i = 0; i < dateComparison.length; i++) {

            //     const difference = dateComparison[i][0] - dateComparison[i][1]

            //     if(difference !== 0) {
            //         userDateIsLarger = difference > 0
            //         break
            //     }
            // }

            const isUserDateLarger = ind => {

                const difference = dateComparison[ind][0] - dateComparison[ind][1]

                if(difference !== 0) return userDateIsLarger = difference > 0

                return isUserDateLarger(ind + 1)
            }

            userDateIsLarger = isUserDateLarger(0)

            // const monthDifference = userMonth - currentMonth
            // if(monthDifference === 0) {
            //     const dayDifference = userDay - currentDay
            //     if(dayDifference === 0) {
            //         const hourDifference = userHour - currentHour
            //         if(hourDifference === 0) {
            //             userDateIsLarger = userMinute >= currentMinute
            //         } else {
            //             userDateIsLarger = hourDifference > 0
            //         }
            //     } else {
            //         userDateIsLarger = dayDifference > 0
            //     }
            // } else {
            //     userDateIsLarger = monthDifference > 0
            // }

            //userDateIsLarger is a boolean but true = 1, and false = 0, so it will take away a year if true
            //The year since the last birthday and the current date
            const baseYear = currentYear - userDateIsLarger

            const userDateFormat = baseYear + userDate.toString().slice(4)

            //Difference between current date and user date measured in milliseconds, excluding years
            const timeDifference = currentTime - new Date(userDateFormat).getTime()

            //Values we will render
            const oneDay = 1000 * 60 * 60 * 24
            const days = Math.floor(timeDifference / oneDay)
            const hours = Math.floor((timeDifference % oneDay) / (1000 * 60 * 60))
            const years = baseYear - userYear

            //Days until birthday
            const userDateIsSmaller = !userDateIsLarger
            const nextBirthdayTime = new Date(`${currentYear + userDateIsSmaller}-${userMonth}-${userDay}`).getTime()
            const daysUntilBirthday = Math.ceil((nextBirthdayTime - currentDateTime) / oneDay)

            //Date of birth in a more readable format
            const dob = userDate.toString().slice(0, 21)

            //Object we'll use to render each recorded user and they're age
            return { name, date, years, days, hours, dob, daysUntilBirthday, userHour, _id }
        })
    }
    
    //Deletes document from database then removes targeted object from state so we don't see it
    handleDelete = async (e) => {

        const id = e.target.id
        await axios.delete("/api/userAges/" + id)

        const newList = this.state.list.filter(({_id}) => _id !== id)

        this.setState({ list: newList, empty: newList.length === 0 })
    }

    //Returns an object to a Link element where it will be used to repurpose our form component to edit our data
    editObject = (name, date, userHour, id) => {
        return {
            pathname: '/edit/' + id,
            name,
            hours: userHour,
            date: date.slice(0, 10)
        }
    }

    render() {
        if(this.state.empty) return (<div className="no-users"><h1>No user records available!</h1></div>)

        const userRecords = this.state.list.map(({ name, date, years, days, hours, dob, daysUntilBirthday, userHour, _id }, index) => (
            <div className="record-container" key={"record" + index}>
                <div className="record">
                    <p><span style={{textDecoration: "underline"}}>Name:</span> {name}</p>
                    <p><span style={{textDecoration: "underline"}}>DOB:</span> {dob}</p>
                    <p><span style={{textDecoration: "underline"}}>Years:</span> {years}</p>
                    <p><span style={{textDecoration: "underline"}}>Days:</span> {days}</p>
                    <p><span style={{textDecoration: "underline"}}>Hours:</span> {hours}</p>
                    { daysUntilBirthday === 0 || daysUntilBirthday > 364 ? <p>Happy Birthday!</p> : (<p><span style={{textDecoration: "underline"}}>Days until birthday:</span> {daysUntilBirthday}</p>) }
                </div>
                <button onClick={this.handleDelete} id={_id} className="delete">Delete</button>
                <Link to={this.editObject(name, date, userHour, _id)}><button className="edit">Edit</button></Link>
            </div>
        ))

        return (
            <div className="list">
                { userRecords }
            </div>
        )
    }
}

export default List 
