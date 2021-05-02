import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import {Patterns} from './Patterns';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import './App.css';

function App() {

  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [title, setTile] = useState("Tic Tac Toe Game");
  const[rstgame, setRstgame] = useState("none");
  useEffect(() => {
    checkWin();
    checkIfTie();
  
    if (player == "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);
  
  useEffect(() => {
    if (result.state != "none") {
      setTile(`Game Finished! Winning Player: ${result.winner}`)
      setRstgame("block")
    }
  }, [result]);
  const chooseSquare = (square) => {
    setBoard(
      board.map((val, idx) => {
        if (idx == square && val == "") {
          return player;
        }
  
        return val;
      })
    );
  };
  
  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });
  
      if (foundWinningPattern) {
        setResult({ winner: player, state: "Won" });
      }
    });
  };
  
  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    });
  
    if (filled) {
      setResult({ winner: "No One", state: "Tie" });
    }
  };
  
  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
    setTile("Tic Tac Toe Game");
    setRstgame("none");
  };

  function Board(props) {
    return (
      <React.Fragment>
        <Grid item xs={4}>
            <Square
                val={board[props.col1]}
                chooseSquare={() => {
                chooseSquare(props.col1);
                }}
            />
        </Grid>
        <Grid item xs={4}>
            <Square
                val={board[props.col2]}
                chooseSquare={() => {
                chooseSquare(props.col2);
                }}
            /> 
        </Grid>
        <Grid item xs={4}>
            <Square
                val={board[props.col3]}
                chooseSquare={() => {
                chooseSquare(props.col3);
                }}
            /> 
        </Grid>
      </React.Fragment>
    );
  };

  function Square({ val, chooseSquare }) {
    return (
      <div className="square" onClick={chooseSquare}>
        {val}
      </div>
    );
  };

  return (
  <div>     
    <Typography variant="headline" className="Header" align="center">
        <h3><b>{title}</b></h3><span><Box  component="span" display={rstgame} p={1} m={1} >
      <Button  className="btnn" variant="contained"  onClick={restartGame}><span className="btn-text"><b>Play Again</b></span></Button></Box></span>
    </Typography>
    <div className="board"> 
     
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            <Board  col1="0" col2="1" col3="2"/>
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Board col1="3" col2="4" col3="5"/>
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Board col1="6" col2="7" col3="8"/>
          </Grid>
        </Grid>
        </div>
    </div>
  );
}

export default App;
