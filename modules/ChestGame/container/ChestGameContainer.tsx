"use client"
import { useChestGameContainer } from "@/modules/ChestGame/hooks/useChestGameContainer"
import { Fragment} from "react"
import { PieceCell } from "../components/piecesCell"
import { LETTERS } from "@/core/constants/constants"

export default function ChestGameContainer() {
    const { board,handleCellClick,possibleMoves } = useChestGameContainer()
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
            <h1 className="text-3xl font-bold text-white mb-8">Chess Game</h1>
            
            <div className="bg-amber-900 p-4 rounded-xl shadow-2xl">
                
                <div className="grid grid-cols-9 gap-0 border-2 border-amber-800 rounded overflow-hidden" data-testid="chess-board">
                    {board.map((row, rowIndex) => (
                        <Fragment key={rowIndex}>
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-10 md:h-16 flex items-center justify-center bg-amber-800 text-amber-200 font-bold text-sm border-r border-amber-700 justify-self-center">
                                {LETTERS[rowIndex]}
                            </div>
                            {row.map((box, colIndex) => (
                                <div 
                                    key={`${rowIndex}-${colIndex}`}
                                    onClick={() => handleCellClick(box, [rowIndex, colIndex])}
                                >
                                    <PieceCell 
                                        piece={box}
                                        position={[rowIndex, colIndex]}
                                        possibleMoves={possibleMoves}
                                    />
                                </div>
                            ))}
                        </Fragment>
                    ))}
                </div>
            </div>
        </main>
    );
}