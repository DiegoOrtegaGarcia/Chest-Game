import { Piece } from "../../types/chestGameTypes";
import { getAllPossibleMovesByDirection  } from "./GeneralPieceLogic";

export const getRookMoves = (piece : Piece, position :[number,number], board : Piece[][]) => {
   const directions : [number,number][] = [[-1,0], [1,0], [0,-1], [0,1]];
    
    return directions.flatMap(direction => 
        getAllPossibleMovesByDirection (piece, position, direction, board)
    );
}