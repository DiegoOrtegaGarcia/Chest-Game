import { BOARD_SIZE, PIECES } from "@/core/constants/constants";
import { Piece } from "../../types/chestGameTypes";
import { getBasicMoves } from "../piecesMovesUtils";
import { isKingInCheck } from "../chestGameUtilts";

export const isValidPosition = (position: [number, number]): boolean => {
  const [row, col] = position;
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
};

export const getPieceAt = (board: Piece[][], position: [number, number]): Piece | null => {
  if (!isValidPosition(position)) return null;
  return board[position[0]][position[1]];
};

export const getAllPossibleMovesByDirection  = (piece: Piece,startPosition: [number, number],direction: [number, number],board: Piece[][]) =>{
    const [row, col] = startPosition;
    const [dRow, dCol] = direction;
    const moves: [number, number][] = [];

    for(let step = 1; step <BOARD_SIZE; step++) {
      const newRow = row + step * dRow;
      const newCol = col + step * dCol;
      const targetPos: [number, number] = [newRow, newCol];
      
      if(!isValidPosition(targetPos)) break;
      
      const targetPiece = getPieceAt(board, targetPos);
      
      if(targetPiece?.value === PIECES.EMPTY) {
          moves.push(targetPos);
          continue;
      }
      
      if(targetPiece && targetPiece.team !== piece.team) {
          moves.push(targetPos);
      }
      break;
    }
    return moves
}

export const getAllMovesSpecificUbication =(positionToIterate: [number,number][],board : Piece[][],piece:Piece) =>{
    const moves :[number,number][] = []
    for (const [newRow, newCol] of positionToIterate) {
      const targetPos: [number, number] = [newRow, newCol];
      
      if (!isValidPosition(targetPos)) continue;
      
      const targetPiece = getPieceAt(board, targetPos);
      
      if (targetPiece && targetPiece.value === PIECES.EMPTY || targetPiece &&  targetPiece.team !== piece.team) {
        moves.push(targetPos);
      }
    }
    return moves
}


export const isSquareUnderAttack = (position: [number, number],defendingTeam: string,board: Piece[][]): boolean => {
  const [targetRow, targetCol] = position;

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const attackerPiece = board[row][col];
      if (attackerPiece.value === PIECES.EMPTY || attackerPiece.team === defendingTeam) {
        continue;
      }
      const possibleMoves = getBasicMoves(attackerPiece, [row, col], board);

      if (possibleMoves && possibleMoves.some(([moveRow, moveCol]) => moveRow === targetRow && moveCol === targetCol)) {
        return true;
      }
    }
  }
  return false;
};

