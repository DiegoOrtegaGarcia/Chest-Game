import { Piece } from "@/core/types/coreTypes";
import { isKingInCheck} from "../cheackLogic/checkLogis";
import { getAllMovesSpecificUbication} from "../moves/GeneralPieceLogic";
import { simulateMove } from "../moves/piecesMovesUtils";

export const getKingMoves = (piece: Piece, position: [number, number], board: Piece[][]): [number, number][] => {
    const basicMoves = getKingBasicMoves(piece, position, board);
    const possibleMoves: [number, number][] = [];
    
    for (const targetPos of basicMoves) {
        const simulatedBoard = simulateMove(board, position, targetPos, piece);
        if (!isKingInCheck(piece.team, simulatedBoard)) {
            possibleMoves.push(targetPos);
        }
    }
    
    return possibleMoves;
}

export const getKingBasicMoves = (piece : Piece, position :[number,number], board : Piece[][]) => {
    const [row,col] = position
    const KingMoves: [number, number][] = [[row - 1, col - 1],[row - 1, col],[row - 1, col + 1],[row,col-1],[row, col + 1],[row + 1, col - 1],[row + 1, col],[row + 1, col + 1]];
    return getAllMovesSpecificUbication(KingMoves,board,piece)
}
