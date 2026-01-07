import { Piece, PieceWithPosition } from "../types/chestGameTypes"
import { getPawnMoves } from "./PiecesIndividualLogic/PawnMoveLogic";
import { getRookMoves } from "./PiecesIndividualLogic/RookMoveLogic";

export const getPosibelsMoves = (pieceWithPos: PieceWithPosition,teamSelection: boolean,board: Piece[][]): [number, number][] => {
  const { type: piece, positon } = pieceWithPos;
  const [row, col] = positon;
  const posiblesMoves: [number, number][] = [];

  switch (piece.value) {
        case "♟":
            return getPawnMoves(piece, [row, col], teamSelection, board);
        case "♜":
            return getRookMoves(piece, [row, col], board);
        default:
            return posiblesMoves;
    }
};

export const isValidPosition = (position: [number, number]): boolean => {
  const [row, col] = position;
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};

export const getPieceAt = (board: Piece[][], position: [number, number]): Piece | null => {
  if (!isValidPosition(position)) return null;
  return board[position[0]][position[1]];
};

