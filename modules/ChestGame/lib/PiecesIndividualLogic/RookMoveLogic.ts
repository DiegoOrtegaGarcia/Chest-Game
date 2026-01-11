import { Piece } from "../../types/chestGameTypes";
import { filterMovesThatExposeCheck } from "../chestGameUtilts";
import { getAllPossibleMovesByDirection } from "./GeneralPieceLogic";

export const getRookMoves = (piece: Piece, position: [number, number], board: Piece[][]): [number, number][] => {
    const basicMoves = getRookBasicMoves(piece, position, board);
    return filterMovesThatExposeCheck(piece, position, basicMoves, board);
};

export const getRookBasicMoves = (piece : Piece, position :[number,number], board : Piece[][]) => {
   const directions : [number,number][] = [[-1,0], [1,0], [0,-1], [0,1]];
    
    return directions.flatMap(direction => 
        getAllPossibleMovesByDirection (piece, position, direction, board)
    );
}