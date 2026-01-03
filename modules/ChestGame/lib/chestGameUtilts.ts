import { Piece } from "../types/chestGameTypes";

const PIECES = {
  EMPTY: " ",
  PAWN: '♟',
  ROOK: '♜' ,
  KNIGHT: '♞',
  BISHOP: '♝' ,
  QUEEN: '♛' ,
  KING: '♚' ,
};

export const createNewBoard = () => {
    const board : Piece[][] = []
    for (let index = 0; index <= 7; index++) {
            board.push(createRowPieces(index))
    }
    return board
}

const createRowPieces = (index : number) => {
     if(index === 0 || index === 7){
            const team = index === 0 ? "white" : 'black'
            return [{value:PIECES.ROOK,team: team}, {value:PIECES.KNIGHT,team: team}, {value:PIECES.BISHOP,team: team}, {value:PIECES.QUEEN,team: team}, {value:PIECES.KING,team: team},{value:PIECES.BISHOP,team: team}, {value:PIECES.KNIGHT,team: team}, {value:PIECES.ROOK,team: team}]
        }
     if (index === 1 || index  === 6){
            const team = index === 1 ? "white" : 'black'
            return Array(8).fill({value:PIECES.PAWN,team: team})
        }    
    return(Array(8).fill({value:PIECES.EMPTY,team:"empty"}))
  
}
