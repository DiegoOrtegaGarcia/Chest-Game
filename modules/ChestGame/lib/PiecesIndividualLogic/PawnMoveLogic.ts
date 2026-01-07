import { Piece } from "../../types/chestGameTypes";
import { getPieceAt } from "./GeneralPieceLogic";


export const getPawnMoves = (piece: Piece, position : [number,number], teamSelection: boolean, board : Piece[][]) => {
    const direction = getPawnDirection(piece.team, teamSelection);
    const [row, col] = position;
    const forwardOne: [number, number] = [row + direction, col];
    const pieceAhead = getPieceAt(board, forwardOne);
    const posiblesMoves = []
    
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

    return posiblesMoves
  }

  const getPawnDirection = (team: string, teamSelection: boolean): number => {
  if (team === "white") {
    return teamSelection ? -1 : 1;
  } else {
    return teamSelection ? 1 : -1;
  }
};