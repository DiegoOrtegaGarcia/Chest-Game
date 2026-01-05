"use client"
import { useChestGameContainer } from "@/modules/ChestGame/hooks/useChestGameContainer"

export default function ChestGameContainer() {
    const { board, selectBoxColor, selectPiecesColor } = useChestGameContainer()
    const LETTERS = ["A", "B", "C", 'D', "E", "F", "G", "H"]
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
            
            <h1 className="text-3xl font-bold text-white mb-8">Chess Game</h1>
            
            <div className="bg-amber-900 p-4 rounded-xl shadow-2xl">
            
                <div className="grid grid-cols-9 gap-0 mb-1">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16flex items-center justify-center"></div>
                    
                    {LETTERS.map((_, index) => (
                        <div 
                            key={`top-${index}`} 
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-10 flex items-center justify-center text-amber-200 font-bold text-sm border-b border-amber-700"
                        >
                            {index + 1}
                        </div>
                    ))}
                </div>
                <div 
                    className="grid grid-cols-9 gap-0 border-2 border-amber-800 rounded overflow-hidden" 
                    data-testid="chess-board"
                >
                    {board.map((row, rowIndex) => (
                        <>
                            <div 
                                key={`letter-${rowIndex}`}
                                className="w-12 h-12 sm:w-14 sm:h-14 md:w-10 md:h-16 flex items-center justify-center bg-amber-800 text-amber-200 font-bold text-sm border-r border-amber-700 justify-self-center "
                            >
                                {LETTERS[rowIndex]}
                            </div>
                            {row.map((box, colIndex) => (
                                <div 
                                    key={`${rowIndex}-${colIndex}`}
                                    data-testid={`row-${rowIndex}-col${colIndex}`}
                                    className={`
                                        w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center
                                        ${selectBoxColor(rowIndex, colIndex)}
                                        font-bold text-5xl
                                        ${selectPiecesColor(box.team)}
                                        hover:brightness-110 transition-all duration-200
                                        border border-amber-800/30
                                    `}
                                >
                                    {box.value}
                                </div>
                            ))}
                        </>
                    ))}
                </div>
            </div>
            
            <div className="mt-8 text-center text-gray-300">
                <p className="text-sm">♖♘♗♕♔♗♘♖ - ♙ Peón | ♘ Caballo | ♗ Alfil | ♖ Torre | ♕ Reina | ♔ Rey</p>
            </div>
        </main>
    )
}