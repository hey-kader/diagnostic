import React, { Component } from "react"
import "./Form.css"
import Test from './Test'
import ReactDOM from 'react-dom'
import axios from 'axios'

function Form () {

    function handle_submit () {


        var name = document.getElementById("name").value
        var email = document.getElementById("email").value
        var student = document.getElementById("student").value
        var age = document.getElementById("age").value

        const data = {
            'name': name,
            'email': email,
            'student': student,
            'age': age
        }

        console.log(data)
        axios.post('https://kaderarnold.com:4431/chess/', JSON.stringify(data))
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

        ReactDOM.unmountComponentAtNode(document.getElementById("form"))
        ReactDOM.render(<Test name={name} email={email} student={student} age={age} />, document.getElementById('form'))
    }

    return (
        <form style={{background: '#f9d79d'}} action="" method="post" onSubmit={(e) => {e.preventDefault(); handle_submit()}} id="form">
            <fieldset>
                <legend>Chess Assessment</legend>
                <table>
                <tr>
                    <td>
                        <label htmlFor="name">
                            Parent Name: 
                        </label>
                        <input id="name" type="text" required />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="email">
                            Email: 
                        </label>
                        <input id="email" type="email" required />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="student">
                            Student: 
                        </label>
                        <input id="student" type="text" required />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="age">
                            Student Age:
                            <select id="age" name="age">
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10" selected>10</option>
                                <option value="10">11</option>
                                <option value="10">12+</option>
                            </select>
                        </label>
                    </td>
                </tr>
                <input type="submit" value="start" />
                </table>
            </fieldset>
        </form>
    );
}

export default Form
