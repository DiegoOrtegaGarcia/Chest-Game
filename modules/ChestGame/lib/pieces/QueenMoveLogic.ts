import { Piece } from "../../types/chestGameTypes"
import { filterMovesThatExposeCheck } from "../moves/piecesMovesUtils";
import { getAllPossibleMovesByDirection } from "../moves/GeneralPieceLogic";

export const getQueenMoves = (piece : Piece, position :[number,number], board : Piece[][]) => {
    const basicMoves = getQueenBasicMoves(piece,position,board)
    return filterMovesThatExposeCheck(piece, position, basicMoves, board);
}

export const getQueenBasicMoves = (piece : Piece, position :[number,number], board : Piece[][]) => {
    const directions : [number,number][] = [[-1,-1], [-1,1], [1,-1], [1,1],[-1,0], [1,0], [0,-1], [0,1]];
        
    return directions.flatMap(direction => 
        getAllPossibleMovesByDirection (piece, position, direction, board)
    );
}
