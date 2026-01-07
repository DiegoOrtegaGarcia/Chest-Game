import { Piece, PieceWithPosition } from "../types/chestGameTypes"
import { getBishopMoves } from "./PiecesIndividualLogic/BishopMoveLogic";
import { getPawnMoves } from "./PiecesIndividualLogic/PawnMoveLogic";
import { getRookMoves } from "./PiecesIndividualLogic/RookMoveLogic";

export const getPosibelsMoves = (pieceWithPos: PieceWithPosition,teamSelection: boolean,board: Piece[][]): [number, number][] => {
  const { type: piece, positon } = pieceWithPos;
  const posiblesMoves: [number, number][] = [];

  switch (piece.value) {
        case "♟":
            return getPawnMoves(piece, positon, teamSelection, board);
        case "♜":
            return getRookMoves(piece, positon, board);
        case '♝':
            return getBishopMoves(piece,positon,board)
        default:
            return posiblesMoves;
    }
};
