import { Piece } from "../../types/chestGameTypes";

export const isValidPosition = (position: [number, number]): boolean => {
  const [row, col] = position;
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};

export const getPieceAt = (board: Piece[][], position: [number, number]): Piece | null => {
  if (!isValidPosition(position)) return null;
  return board[position[0]][position[1]];
};

export const getAllPossibleMovesByDirection  = (piece: Piece,startPosition: [number, number],direction: [number, number],board: Piece[][]) =>{
    const [row, col] = startPosition;
    const [dRow, dCol] = direction;
    const moves: [number, number][] = [];
    const maxSteps: number = 8

    for(let step = 1; step < maxSteps; step++) {
      const newRow = row + step * dRow;
      const newCol = col + step * dCol;
      const targetPos: [number, number] = [newRow, newCol];
      
      if(!isValidPosition(targetPos)) break;
      
      const targetPiece = getPieceAt(board, targetPos);
      
      if(targetPiece?.value === " ") {
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