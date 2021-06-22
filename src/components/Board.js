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
        display: 'flex'
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
        <div id="board" style={{margin: 'auto', display: 'inline'}}>
            <Chessboard
                position={fen}
                onDrop={onDrop}
            />
        </div>
    )
}



export default Board
