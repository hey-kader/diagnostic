import React, { Component } from "react"
import "./Form.css"
import Test from './Test'
import ReactDOM from 'react-dom'

function Form () {
    function handle_submit () {
        document.getElementById("form").innerHTML = "";
        ReactDOM.render(<Test />, document.getElementById('root'))
    }
    return (
        <form action="" onSubmit={(e) => {e.preventDefault(); handle_submit()}} id="form">
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
