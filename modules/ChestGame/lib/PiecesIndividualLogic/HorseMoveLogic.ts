import { Piece } from "../../types/chestGameTypes";
import { getPieceAt, isValidPosition } from "./GeneralPieceLogic";

export const getHorseMoves = (piece: Piece,position: [number, number],board: Piece[][]): [number, number][] => {

  const [row,col] = position

  const HorseMoves: [number, number][] = [[row - 2, col - 1],[row - 2, col + 1],[row + 2, col - 1],[row + 2, col + 1],[row - 1, col - 2],[row - 1, col + 2],[row + 1, col - 2],[row + 1, col + 2]];

  const possibleMoves: [number, number][] = [];

  for (const [newRow, newCol] of HorseMoves) {
    const targetPos: [number, number] = [newRow, newCol];
    
    if (!isValidPosition(targetPos)) continue;
    
    const targetPiece = getPieceAt(board, targetPos);
    
    if (targetPiece && targetPiece.value === " " || targetPiece &&  targetPiece.team !== piece.team) {
      possibleMoves.push(targetPos);
    }
  }

  return possibleMoves;
};
