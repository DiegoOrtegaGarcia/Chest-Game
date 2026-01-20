import {BOARD_SIZE, PIECES } from "@/core/constants/constants";
import { getBasicMoves, getPossibleMoves, simulateMove } from "../moves/piecesMovesUtils";
import { getKingPosition } from "../board/boardUtils";
import { Piece } from "@/core/types/coreTypes";

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
    // 1. Verificar que el rey esté en jaque
    if (!isKingInCheck(team, board)) {
        return false;
    }
    
    // 2. Verificar si el rey tiene movimientos legales
    const kingPosition = getKingPosition(team, board);
    if (!kingPosition) return false;
    
    const king = board[kingPosition[0]][kingPosition[1]];
    const kingMoves = getPossibleMoves(
        { type: king, position: kingPosition },
        team === "white",
        board
    ) || [];
    
    // Si el rey tiene al menos un movimiento legal, no es jaque mate
    if (kingMoves.length > 0) {
        return false;
    }
    
    // 3. Verificar si alguna pieza aliada puede bloquear o capturar
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const piece = board[row][col];
            
            if (piece.team !== team || piece.value === PIECES.KING) {
                continue;
            }
            
            const moves = getPossibleMoves(
                { type: piece, position: [row, col] as [number, number] },
                team === "white",
                board
            ) || [];
            
            for (const move of moves) {
                const simulatedBoard = simulateMove(board, [row, col], move, piece);
                if (!isKingInCheck(team, simulatedBoard)) {
                    return false; // Hay un movimiento que bloquea el jaque
                }
            }
        }
    }
    
    return true; // Es jaque mate
};

