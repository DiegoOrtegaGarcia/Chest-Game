import { useCellPiecesCell } from "../hooks/cellPiecesCell";
import { PieceCellInterface } from "../types/chestGameTypes";

interface PieceCellProps extends PieceCellInterface {
    possibleMoves?: [number, number][];
}

export const PieceCell = ({ piece, position, possibleMoves = [] }: PieceCellProps) => {
    const [row, col] = position;
    const { selectBoxColor, selectPiecesColor,isPossibleMove } = useCellPiecesCell(possibleMoves,[row,col]);
    return (
        <div 
            key={`${row}-${col}`}
            data-testid={`row-${row}-col${col}`}
            data-is-possible-move={isPossibleMove}
            className={`
                w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 
                flex items-center justify-center
                ${selectBoxColor(row, col)}
                ${isPossibleMove ? 'bg-green-500/50' : ''}
                font-bold text-5xl
                ${selectPiecesColor(piece.team)}
                hover:brightness-110 transition-all duration-200
                border border-amber-800/30
                cursor-pointer
            `}
        >
            {piece.value}
        </div>
    );
};