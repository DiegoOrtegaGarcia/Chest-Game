import { useCallback, useMemo, useState } from "react";
import { createNewBoard } from "../lib/board/boardUtils";
import { Piece } from "@/core/types/coreTypes";
import { getPossibleMoves } from "../lib/moves/piecesMovesUtils";
import { PIECES } from "@/core/constants/constants";
import { useGameStore } from "@/core/storages/gameStorage";



export const useChestGameContainer = () => {
    const [board, setBoard] = useState<Piece[][]>(createNewBoard());
    const [selectedPiece, setSelectedPiece] = useState<{piece: Piece; position: [number, number];} | null>(null);
    
    const { turn, changeTurn, playerTeam } = useGameStore();
    
    const isPlayersTurn = useMemo(() => {
      return turn === playerTeam;
    }, [turn, playerTeam]);
    
    const canInteract = useMemo(() => {
      return isPlayersTurn;
    }, [isPlayersTurn]);
    
    const possibleMoves = useMemo(() => {
        if (!selectedPiece || !canInteract) return [];
        
        if (selectedPiece.piece.team !== playerTeam) return [];
        
        return getPossibleMoves({ type: selectedPiece.piece, position: selectedPiece.position }, true, board) || [];
    }, [selectedPiece, board, playerTeam, canInteract]);

    const handleCellClick = (piece: Piece, position: [number, number]) => {
        if (!canInteract) {
          return;
        }
        
        if (!selectedPiece) {
            if (!isEmpty(piece) && piece.team === playerTeam) {
                setSelectedPiece({ piece, position });
            }
            return;
        }
        
        const moveIsValid = possibleMoves.some(
          move => move[0] === position[0] && move[1] === position[1]
        );
        
        if (moveIsValid) {
            movePiece(selectedPiece.position, position, selectedPiece.piece);
            changeTurn();
            setSelectedPiece(null);
        } else {
            if (isEmpty(piece)) {
                setSelectedPiece(null);
            } else {
                if (piece.team === playerTeam) {
                    setSelectedPiece({ piece, position });
                }
            }
        }
    };
    
    const movePiece = useCallback((startPosition: [number, number], endPosition: [number, number], piece: Piece) => {
        const [startRow, startCol] = startPosition;
        const [endRow, endCol] = endPosition;
        const newBoard = board.map(row => [...row]);
        newBoard[endRow][endCol] = piece;
        newBoard[startRow][startCol] = { value: PIECES.EMPTY, team: "empty" };
        setBoard(newBoard);
    }, [board]);

    const isEmpty = (piece: Piece) => {
        return piece.team === 'empty';
    };

    return { board, handleCellClick, possibleMoves, selectedPiece,turn,playerTeam,isPlayersTurn,canInteract,};
};