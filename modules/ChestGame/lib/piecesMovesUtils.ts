import { Piece } from "../types/chestGameTypes"

interface PieceWithPosition {
  type: Piece;
  positon: [number, number];
}

export const getPosibelsMoves = (pieceWithPos: PieceWithPosition,teamSelection: boolean,board: Piece[][]): [number, number][] => {
  const { type: piece, positon } = pieceWithPos;
  const [row, col] = positon;
  const posiblesMoves: [number, number][] = [];

  if (piece.value === "♟") {
    const direction = getPawnDirection(piece.team, teamSelection);
    
    const forwardOne: [number, number] = [row + direction, col];
    const pieceAhead = getPieceAt(board, forwardOne);
    
    if (pieceAhead?.value === " ") {
      posiblesMoves.push(forwardOne);
      
      const isInitialRow = (piece.team === "white" && row === 6) || (piece.team === "black" && row === 1);
      
      if (isInitialRow) {
        const forwardTwo: [number, number] = [row + (2 * direction), col];
        const pieceTwoAhead = getPieceAt(board, forwardTwo);
        if (pieceTwoAhead?.value === " ") {
          posiblesMoves.push(forwardTwo);
        }
      }
    }

    const captureOffsets: [number, number][] = [
      [direction, 1],
      [direction, -1]
    ];

    for (const [dRow, dCol] of captureOffsets) {
      const capturePos: [number, number] = [row + dRow, col + dCol];
      const targetPiece = getPieceAt(board, capturePos);
      
      if (targetPiece && targetPiece.value !== " " && targetPiece.team !== piece.team) {
        posiblesMoves.push(capturePos);
      }
    }
  }

  return posiblesMoves;
};

const getPawnDirection = (team: string, teamSelection: boolean): number => {
  if (team === "white") {
    return teamSelection ? -1 : 1;
  } else {
    return teamSelection ? 1 : -1;
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