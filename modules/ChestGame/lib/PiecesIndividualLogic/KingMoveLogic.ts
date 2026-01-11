import { Piece } from "../../types/chestGameTypes";
import { getAllMovesSpecificUbication, isSquareUnderAttack} from "./GeneralPieceLogic";

export const getKingMoves = (piece : Piece, position :[number,number], board : Piece[][]) => {
    const basicMoves = getKingBasicMoves(piece,position,board)
    const possibleMoves = []
    for(let i = 0 ;i < basicMoves.length; i++){
        const positionToVerify = basicMoves[i]
        if(!isSquareUnderAttack(positionToVerify,piece.team,board)) possibleMoves.push(positionToVerify)
    }
    return possibleMoves 
}

export const getKingBasicMoves = (piece : Piece, position :[number,number], board : Piece[][]) => {
    const [row,col] = position
    const KingMoves: [number, number][] = [[row - 1, col - 1],[row - 1, col],[row - 1, col + 1],[row,col-1],[row, col + 1],[row + 1, col - 1],[row + 1, col],[row + 1, col + 1]];
    return getAllMovesSpecificUbication(KingMoves,board,piece)
}
