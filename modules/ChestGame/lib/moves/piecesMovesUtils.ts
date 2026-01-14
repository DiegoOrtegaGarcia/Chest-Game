import { PIECES } from "@/core/constants/constants";
import { getBishopBasicMoves, getBishopMoves } from "../pieces/BishopMoveLogic";
import { getPawnBasicMoves, getPawnMoves } from "../pieces/PawnMoveLogic";
import { getRookBasicMoves, getRookMoves } from "../pieces/RookMoveLogic";
import { getKnightBasicMoves, getKnightMoves } from "../pieces/KnightMoveLogic";
import { getQueenBasicMoves, getQueenMoves } from "../pieces/QueenMoveLogic";
import { getKingBasicMoves, getKingMoves } from "../pieces/KingMoveLogic";
import { isKingInCheck } from "../cheackLogic/checkLogis";
import { Piece, PieceWithPosition } from "@/core/types/coreTypes";

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


export const filterMovesThatExposeCheck = (piece: Piece,startPosition: [number, number],basicMoves: [number, number][],board: Piece[][]): [number, number][] => {
    const validMoves: [number, number][] = [];

    for (const targetPos of basicMoves) {
        const simulatedBoard = simulateMove(board, startPosition, targetPos, piece);
        if (!isKingInCheck(piece.team, simulatedBoard)) {
            validMoves.push(targetPos);
        }
    }

    return validMoves;
};

export const simulateMove = (board: Piece[][],from: [number, number],to: [number, number],movingPiece: Piece): Piece[][] => {
    const newBoard = board.map(row => [...row]);
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    newBoard[fromRow][fromCol] = { value: PIECES.EMPTY, team: 'empty' };
    newBoard[toRow][toCol] = { ...movingPiece };
    return newBoard;
};