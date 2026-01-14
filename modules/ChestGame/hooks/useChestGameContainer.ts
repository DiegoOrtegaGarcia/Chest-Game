import { useCallback, useMemo, useState } from "react"
import { createNewBoard } from "../lib/board/boardUtils"
import { Piece } from "@/core/types/coreTypes"
import { getPossibleMoves } from "../lib/moves/piecesMovesUtils"
import { PIECES } from "@/core/constants/constants"

export const useChestGameContainer = () => {
    const [board, setBoard] = useState<Piece[][]>(createNewBoard())
    const [selectedPiece, setSelectedPiece] = useState<{piece: Piece; position: [number, number];} | null>(null);
    const possibleMoves = useMemo(() => {
        if (!selectedPiece) return [];
        return getPossibleMoves({ type: selectedPiece.piece, position: selectedPiece.position }, true, board) || [];
    }, [selectedPiece, board]);

    const handleCellClick = (piece: Piece, position: [number, number]) => {
        if (!selectedPiece) {
            if (!isEmpty(piece)) {
                setSelectedPiece({ piece, position });
            }
            return;
        }
        const moveIsValid = possibleMoves.some(move => move[0] === position[0] && move[1] === position[1]);
        if (moveIsValid) {
            movePiece(selectedPiece.position, position, selectedPiece.piece);
            setSelectedPiece(null);
        } else {
            if (isEmpty(piece)) {
                setSelectedPiece(null);
            }else{
                setSelectedPiece({ piece, position })
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

    const isEmpty= (piece: Piece)=>{
        if (piece.team !== 'empty') {
            return false
        }
        return true
    }
    return { board, handleCellClick, possibleMoves, selectedPiece };
};