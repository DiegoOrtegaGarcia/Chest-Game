import {BOARD_SIZE, PIECES } from "@/core/constants/constants";
import { Piece } from "../../types/chestGameTypes";
import { getBasicMoves, getPossibleMoves, simulateMove } from "../moves/piecesMovesUtils";
import { getKingPosition } from "../board/boardUtils";

export const isKingInCheck = (kingTeam: string,board: Piece[][])=> {
    const kingPosition: [number, number] | null = getKingPosition(kingTeam,board);

    if (kingPosition) {
        return isSquareUnderAttack(kingPosition, kingTeam, board);
    }
    
};

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


export const isCheckMate = (team: string, board: Piece[][]): boolean => {

    if (!isKingInCheck(team, board)) {
        return false;
    }

    const kingPosition: [number, number] | null = getKingPosition(team,board);
    if (!kingPosition) return false;

    const KING = board[kingPosition[0]][kingPosition[1]]
    const teamSelection = team === "white";

    const kingMoves = getPossibleMoves({ type: KING, position: kingPosition },teamSelection, board);

    if (kingMoves && kingMoves.length > 0) {
        return false;
    }

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const currentPiece = board[row][col];

            if (currentPiece.team !== team || currentPiece.value === PIECES.KING) {
                continue;
            }

            const allyMoves = getPossibleMoves({ type: currentPiece, position: [row, col] },teamSelection,board);

            for (const move of allyMoves || []) {
                const simulatedBoard = simulateMove(board, [row, col], move, currentPiece);
                if (!isKingInCheck(team, simulatedBoard)) {
                    return false;
                }
            }
        }
    }
    return true;
};

