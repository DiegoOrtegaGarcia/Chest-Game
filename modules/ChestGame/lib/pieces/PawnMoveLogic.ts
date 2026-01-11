import { PIECES } from "@/core/constants/constants";
import { Piece } from "../../types/chestGameTypes";
import { filterMovesThatExposeCheck } from "../moves/piecesMovesUtils";
import { getPieceAt } from "../board/boardUtils";


export const getPawnMoves = (piece: Piece, position : [number,number], teamSelection: boolean, board : Piece[][]) => {
    const basicMoves = getPawnBasicMoves(piece,position,teamSelection,board)
    return filterMovesThatExposeCheck(piece, position, basicMoves, board);
  }

export const getPawnBasicMoves = (piece: Piece, position : [number,number], teamSelection: boolean, board : Piece[][]) => {
    const direction = getPawnDirection(piece.team, teamSelection);
    const [row, col] = position;
    const forwardOne: [number, number] = [row + direction, col];
    const pieceAhead = getPieceAt(board, forwardOne);
    const possibleMoves = []
    
    if (pieceAhead?.value === PIECES.EMPTY) {
      possibleMoves.push(forwardOne);
      
      const isInitialRow = (piece.team === "white" && row === 6) || (piece.team === "black" && row === 1);
      
      if (isInitialRow) {
        const forwardTwo: [number, number] = [row + (2 * direction), col];
        const pieceTwoAhead = getPieceAt(board, forwardTwo);
        if (pieceTwoAhead?.value === PIECES.EMPTY) {
          possibleMoves.push(forwardTwo);
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
      
      if (targetPiece && targetPiece.value !== PIECES.EMPTY && targetPiece.team !== piece.team) {
        possibleMoves.push(capturePos);
      }
    }

    return possibleMoves
  }

  const getPawnDirection = (team: string, teamSelection: boolean): number => {
  if (team === "white") {
    return teamSelection ? -1 : 1;
  } else {
    return teamSelection ? 1 : -1;
  }
};