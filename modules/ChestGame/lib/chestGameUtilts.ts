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

export const createNewBoard = (teamSelection: boolean = true) => {
    const board : Piece[][] = []
    for (let index = 0; index <= 7; index++) {
            board.push(createRowPieces(index,teamSelection))
    }
    return board
}

const createRowPieces = (index : number,teamSelection:boolean) => {
     if(index === 0 || index === 7){
            const team = index === 0 ? selectTeamByChoice(teamSelection) : selectTeamByChoice(!teamSelection)
            return [{value:PIECES.ROOK,team: team}, {value:PIECES.KNIGHT,team: team}, {value:PIECES.BISHOP,team: team}, {value:PIECES.QUEEN,team: team}, {value:PIECES.KING,team: team},{value:PIECES.BISHOP,team: team}, {value:PIECES.KNIGHT,team: team}, {value:PIECES.ROOK,team: team}]
        }
     if (index === 1 || index  === 6){
            const team = index === 1 ? selectTeamByChoice(teamSelection) : selectTeamByChoice(!teamSelection)
            return Array(8).fill({value:PIECES.PAWN,team: team})
        }    
    return(Array(8).fill({value:PIECES.EMPTY,team:"empty"}))
  
}

const selectTeamByChoice = (teamSelection:boolean)=>{
    return teamSelection ? "black" :"white"
}