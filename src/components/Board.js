import React, { Component, useRef, useEffect, useState } from "react"
import Chessboard from "chessboardjsx"
import Chess from "chess.js"
import axios from "axios"

function Board (props) {
    
    const [fen, setFen] = useState(props.fen)

    let game = useRef(null)
    useEffect (() => {
        game.current = new Chess (fen)
    }, [])

    const style = {
        display: 'inline'
    }

    const onDrop = ({sourceSquare, targetSquare}) => {
        let move = game.current.move({
            from: sourceSquare,
            to: targetSquare
        })

        if (move === null) return;
        setFen(game.current.fen())

        console.log(targetSquare)
        document.getElementById("playerMove").innerHTML = targetSquare
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
