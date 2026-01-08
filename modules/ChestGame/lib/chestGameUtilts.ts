import { BOARD_SIZE, PIECES } from "@/core/constants/constants";
import { Piece } from "../types/chestGameTypes";

export const createNewBoard = (teamSelection: boolean = true) => {
    const board : Piece[][] = []
    for (let index = 0; index <= 7; index++) {
            board.push(createRowPieces(index,teamSelection))
    }
    return board
}

const createRowPieces = (index : number,teamSelection:boolean) : Piece[] => {
     if(index === 0 || index === 7){
            const team = index === 0 ? selectTeamByChoice(teamSelection) : selectTeamByChoice(!teamSelection)
            return [{value:PIECES.ROOK,team: team}, {value:PIECES.KNIGHT,team: team}, {value:PIECES.BISHOP,team: team}, {value:PIECES.QUEEN,team: team}, {value:PIECES.KING,team: team},{value:PIECES.BISHOP,team: team}, {value:PIECES.KNIGHT,team: team}, {value:PIECES.ROOK,team: team}]
        }
     if (index === 1 || index  === 6){
            const team = index === 1 ? selectTeamByChoice(teamSelection) : selectTeamByChoice(!teamSelection)
            return Array.from({length: BOARD_SIZE}, () => ({value: PIECES.PAWN, team}));
        }    
    return Array.from({length: BOARD_SIZE}, () => ({value: PIECES.EMPTY, team : "empty"}));
  
}

const selectTeamByChoice = (teamSelection:boolean)=>{
    return teamSelection ? "black" :"white"
}