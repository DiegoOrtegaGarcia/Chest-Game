import { BOARD_SIZE, PIECES } from "@/core/constants/constants";
import { Piece } from "../types/chestGameTypes";
import { isSquareUnderAttack } from "./PiecesIndividualLogic/GeneralPieceLogic";

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

export const isKingInCheck = (kingTeam: string,board: Piece[][])=> {
    let kingPosition: [number, number] | null = null;

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const piece = board[row][col];
            if (piece.value === PIECES.KING && piece.team === kingTeam) {
                kingPosition = [row, col];
                break;
            }
        }
        if (kingPosition) break;
    }

    if (kingPosition) {
        return isSquareUnderAttack(kingPosition, kingTeam, board);
    }
    
};

export const filterMovesThatExposeCheck = (piece: Piece,startPosition: [number, number],basicMoves: [number, number][],board: Piece[][]): [number, number][] => {
    const validMoves: [number, number][] = [];

    for (const targetPos of basicMoves) {
        const simulatedBoard = simulateMove(board, startPosition, targetPos, piece);
        if (!isKingInCheck(piece.team, simulatedBoard)) {
            validMoves.push(targetPos);
        }
    }

    return validMoves;
};

export const simulateMove = (board: Piece[][],from: [number, number],to: [number, number],movingPiece: Piece): Piece[][] => {
    const newBoard = [...board];
    newBoard[from[0]] = [...board[from[0]]];
    newBoard[to[0]] = board[to[0]] === board[from[0]] ? newBoard[from[0]] : [...board[to[0]]];
    
    newBoard[from[0]][from[1]] = { value: PIECES.EMPTY, team: 'empty' };
    newBoard[to[0]][to[1]] = { ...movingPiece };
    
    return newBoard;
};