import React, { Component, useState, useEffect } from "react"

function Thanks (props) {
    const [submit, setSubmit] = useState(props.submit)
    const answers = props.answers
    const user = props.user
    
    function score () {
        var count = 0
        for (var i = 0; i < 40; i++) {
            if (props.submit[i] === props.answers[i]) {
                count++
            }
        }
        return parseFloat(count/40.0 * 100)
    }

    return (
        <div>
            <h1>Thanks {user['student']}!</h1>
            <h2>Score: {score()}%</h2>
        </div>
    )
}
export default Thanks
