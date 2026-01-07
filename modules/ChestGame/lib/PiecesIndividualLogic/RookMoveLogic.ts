import { Piece } from "../../types/chestGameTypes";
import { getPieceAt, isValidPosition } from "../piecesMovesUtils";

export const getRookMoves = (piece : Piece, [row, col] :[number,number], board : Piece[][]) => {
   const directions = [[-1,0], [1,0], [0,-1], [0,1]];
   const posiblesMoves = []
    
    for(const [dRow, dCol] of directions) {

      for(let step = 1; step < 8; step++) {
          const newRow = row + step * dRow;
          const newCol = col + step * dCol;
          const targetPos: [number, number] = [newRow, newCol];
          
          if(!isValidPosition(targetPos)) break;
          
          const targetPiece = getPieceAt(board, targetPos);
          
          if(targetPiece?.value === " ") {
              posiblesMoves.push(targetPos);
              continue;
          }
          
          if(targetPiece && targetPiece.team !== piece.team) {
              posiblesMoves.push(targetPos);
          }
          break;
        }
      }
      return posiblesMoves
}