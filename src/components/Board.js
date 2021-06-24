import React, { Component, useRef, useEffect, useState } from "react"
import Chessboard from "chessboardjsx"
import Chess from "chess.js"
import axios from "axios"

function Board (props) {
    
    const [fen, setFen] = useState(props.fen)

    let game = useRef(null)
    useEffect (() => {
	if (game === null) {
	    document.getElementById("next").style.visibility = "hidden"
	    document.getElementById("reset").style.visibility = "hidden"
	}
	else {
	    game.current = new Chess (fen)
	}
    }, [])


    const onDrop = ({sourceSquare, targetSquare}) => {
        let move = game.current.move({
            from: sourceSquare,
            to: targetSquare
        })

        if (move === null) return;
        setFen(game.current.fen())

        console.log(targetSquare)
        document.getElementById("playerMove").innerHTML = targetSquare

        document.getElementById("next").style.display = "block"
        document.getElementById("reset").style.display = "block"
    }
    
    return (
        <div id="board" className="wrapper" >
            <Chessboard
                position={fen}
                onDrop={onDrop}
		width={340}
            />
        </div>
    )
}



export default Board
