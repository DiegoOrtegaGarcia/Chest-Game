import { PIECES } from "@/core/constants/constants";
import { Piece, PieceWithPosition } from "../types/chestGameTypes"
import { getBishopMoves } from "./PiecesIndividualLogic/BishopMoveLogic";

import { getKingMoves } from "./PiecesIndividualLogic/KingMoveLogic";
import { getKnightMoves } from "./PiecesIndividualLogic/KnightMoveLogic";
import { getPawnMoves } from "./PiecesIndividualLogic/PawnMoveLogic";
import { getQueenMoves } from "./PiecesIndividualLogic/QueenMoveLogic";
import { getRookMoves } from "./PiecesIndividualLogic/RookMoveLogic";

export const getPossibleMoves = (pieceWithPos: PieceWithPosition,teamSelection: boolean,board: Piece[][]): [number, number][] | null => {
  const { type: piece, position } = pieceWithPos;

  switch (piece.value) {
        case PIECES.PAWN:
            return getPawnMoves(piece, position, teamSelection, board);
        case PIECES.ROOK:
            return getRookMoves(piece, position, board);
        case PIECES.BISHOP:
            return getBishopMoves(piece,position,board)
        case PIECES.KNIGHT:
            return getKnightMoves(piece,position,board)
        case PIECES.QUEEN:
          return getQueenMoves(piece,position,board)  
        case PIECES.KING:
            return getKingMoves(piece,position,board)
        default:
            return null;
    }
};
