import React, {Component} from "react"

import Board from "./Board"
import axios from "axios"

import Chessboard from "chessboardjsx"

const api = axios.create ({
    baseURL: "http://localhost:3000/"
})



function* iter (fenlist) {
    for (var i = 0; i < fenlist.length ; i++) {
        console.log(fenlist[i].fen)
        yield fenlist[i].fen
    }
}

function handle_click (f) {
    // check if it.next().value is undefined
    document.getElementById("f").innerHTML = f
}

class Test extends Component {

    state = {
        fens: [],
        current: ""
    }

    
    constructor () {
        super()
        api.get ('/fenlist.json').then (res => {
            this.setState({fens: res.data})
        })

    }

    render () {
        const it = iter(this.state.fens)
        const t = it.next()
        return (
            <div>
                <h1 id="f">{String(t.value)}</h1>
                <div id="board">
                    <Chessboard
                        position={t.value}
                    />
                </div>
                <button onClick={() =>handle_click(String(it.next().value))} id="next">next</button>
            </div>
        )
    }

}

export default Test
