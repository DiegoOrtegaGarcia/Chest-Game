import { BOARD_SIZE, PIECES } from "@/core/constants/constants"
import { Piece } from "@/core/types/coreTypes"


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


export const isValidPosition = (position: [number, number]): boolean => {
  const [row, col] = position;
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
};

export const getPieceAt = (board: Piece[][], position: [number, number]): Piece | null => {
  if (!isValidPosition(position)) return null;
  return board[position[0]][position[1]];
};


export const getKingPosition = (team: string, board: Piece[][]) : [number,number] | null =>{

    let kingPosition: [number, number] | null = null;

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const piece = board[row][col];
            if (piece.value === PIECES.KING && piece.team === team) {
                kingPosition = [row, col];
                break;
            }
        }
        if (kingPosition) break;
    }

    return kingPosition
}
