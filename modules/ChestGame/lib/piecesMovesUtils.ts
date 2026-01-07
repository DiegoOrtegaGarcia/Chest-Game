import { Piece, PieceWithPosition } from "../types/chestGameTypes"
import { getBishopMoves } from "./PiecesIndividualLogic/BishopMoveLogic";
import { getHorseMoves } from "./PiecesIndividualLogic/HorseMoveLogic";
import { getPawnMoves } from "./PiecesIndividualLogic/PawnMoveLogic";
import { getRookMoves } from "./PiecesIndividualLogic/RookMoveLogic";

export const getPosibelsMoves = (pieceWithPos: PieceWithPosition,teamSelection: boolean,board: Piece[][]): [number, number][] | null => {
  const { type: piece, positon } = pieceWithPos;

  switch (piece.value) {
        case "♟":
            return getPawnMoves(piece, positon, teamSelection, board);
        case "♜":
            return getRookMoves(piece, positon, board);
        case '♝':
            return getBishopMoves(piece,positon,board)
        case '♞':
            return getHorseMoves(piece,positon,board) 
        default:
            return null;
    }
};
