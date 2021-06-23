import React, {Component} from "react"
import Board from "./Board"
import axios from "axios"
import ReactDOM from "react-dom"
import Thanks from "./Thanks"
import "./Test.css"

let a = []
let titles = []

function* iter (fenlist) {
    for (var i = 0; i < fenlist.length ; i++) {
        if (typeof(fenlist[i].fen) !== "undefined") {
            document.getElementById("title").innerHTML = fenlist[i].id + '. '+ fenlist[i].color + ' To Move'
            document.getElementById("fen").innerHTML = fenlist[i].fen
            a.push(fenlist[i].answer)
            titles.push(fenlist[i].title)
            console.log(a)
           yield fenlist[i].fen
        }
    }
}

let ar = [] 

function handle_click (f, pr) {
    console.log(f)
    if (typeof(f) !== "undefined") {

        ar.push(document.getElementById("playerMove").innerHTML)
        console.log(ar)
        document.getElementById("playerMove").innerHTML = ""
        ReactDOM.unmountComponentAtNode(document.getElementById("board"))
        const board = <Board fen={f} />
            ReactDOM.render(board, document.getElementById("board"))
    }

    else {

        ar.push(document.getElementById("playerMove").innerHTML)
        console.log(f)
        const thanks = <Thanks titles={titles} answers={a} user={pr} submit={ar} />
        ReactDOM.render(thanks, document.getElementById("root"))
    }
}

function reset_click () {
    const fen = document.getElementById("fen").innerHTML
    ReactDOM.unmountComponentAtNode(document.getElementById("board"))
    const board = <Board fen={fen} />
        ReactDOM.render(board, document.getElementById("board"))
}

const api = axios.create ({
    baseURL: "http://localhost:3000/"
})


class Test extends Component {

    state = {
        fens: [],
        move: "",
        moves: []
    }
    
    constructor () {
        super()
        api.get ('/fenlist.json').then (res => {
            this.setState({fens: res.data})
            console.log(res.data)
        })

    }
    componentDidMount() {
        console.log(this.props)
    }
    
    render () {
        const it = iter(this.state.fens)
        let t = it.next().value
        return (
            <div style={{marginTop: '2rem'}}>
                <h2 id="title"></h2>
                <h3 id="fen" hidden></h3>
                <h2 id="playerMove" hidden></h2>

                <div id="board">
                    {typeof(t) !== "undefined" ? <Board fen={t} /> : ""}
                </div>
                <br />
                <button id="reset" onClick={() => reset_click()} style={{borderStyle: 'inset'}}>reset</button>
                <button style={{borderStyle: 'inset'}} onClick={() => handle_click(it.next().value, this.props)} id="next">next</button>
            </div>
        )
    }
}

export default Test
