import { PIECES } from "@/core/constants/constants";
import { Piece, PieceWithPosition } from "../types/chestGameTypes"
import { getBishopBasicMoves, getBishopMoves } from "./PiecesIndividualLogic/BishopMoveLogic";
import { getPawnBasicMoves, getPawnMoves } from "./PiecesIndividualLogic/PawnMoveLogic";
import { getRookBasicMoves, getRookMoves } from "./PiecesIndividualLogic/RookMoveLogic";
import { getKnightBasicMoves, getKnightMoves } from "./PiecesIndividualLogic/KnightMoveLogic";
import { getQueenBasicMoves, getQueenMoves } from "./PiecesIndividualLogic/QueenMoveLogic";
import { getKingBasicMoves, getKingMoves } from "./PiecesIndividualLogic/KingMoveLogic";


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

export const getBasicMoves = (piece: Piece,position : [number,number],board: Piece[][]): [number, number][] | null => {

  switch (piece.value) {
        case PIECES.PAWN:
            const team = piece.team === "white" ? true : false
            return getPawnBasicMoves(piece, position, team, board);
        case PIECES.ROOK:
            return getRookBasicMoves(piece, position, board);
        case PIECES.BISHOP:
            return getBishopBasicMoves(piece,position,board)
        case PIECES.KNIGHT:
            return getKnightBasicMoves(piece,position,board)
        case PIECES.QUEEN:
          return getQueenBasicMoves(piece,position,board)  
        case PIECES.KING:
            return getKingBasicMoves(piece,position,board)
        default:
            return null;
    }
};
