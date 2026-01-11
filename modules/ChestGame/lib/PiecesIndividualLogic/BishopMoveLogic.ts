import { Piece } from "../../types/chestGameTypes"
import { filterMovesThatExposeCheck } from "../chestGameUtilts";
import { getAllPossibleMovesByDirection } from "./GeneralPieceLogic";

export const getBishopMoves = (piece : Piece, position :[number,number], board : Piece[][]) => {
    const basicMoves = getBishopBasicMoves(piece,position,board)
    return filterMovesThatExposeCheck(piece, position, basicMoves, board);
}

export const getBishopBasicMoves = (piece : Piece, position :[number,number], board : Piece[][]) => {
    const directions : [number,number][] = [[-1,-1], [-1,1], [1,-1], [1,1]];
        
    return directions.flatMap(direction => 
        getAllPossibleMovesByDirection (piece, position, direction, board)
    );
}