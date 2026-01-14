import { useCallback } from "react";

export const useCellPiecesCell= (posibleMoves : [number,number][],[row,col] : [number,number]) =>{
    
    const selectBoxColor = useCallback((row: number, col: number) => {
        return (row + col) % 2 ? "bg-amber-200" : "bg-amber-800";
    }, []);

    const selectPiecesColor = useCallback((team: string) => {
        return team === "white" ? 'text-white' : team === "black" ? 'text-black' : '';
    }, []);

    const isPossibleMove = posibleMoves.some(([r, c]) => r === row && c === col);
    return {selectBoxColor,selectPiecesColor,isPossibleMove}
}