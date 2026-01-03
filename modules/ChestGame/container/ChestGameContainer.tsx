"use client"
import { useState } from "react"
import { createNewBoard, selectBoxColor } from "../lib/chestGameUtilts"

export default function ChestGameContainer() {
    const [board, setBoard] = useState<number[][]>(createNewBoard())
    
    return (
        <main className="flex w-screen h-screen items-center justify-center">
            <div 
                className="grid grid-cols-8 gap-0 border-2 border-gray-800" 
                data-testid="chess-board"
            >
                {board.map((row, rowIndex) => (
                    row.map((box, colIndex) => (
                        <div 
                            key={`${rowIndex}-${colIndex}`}
                            data-testid={`row-${rowIndex}-col${colIndex}`}
                            className={`
                                w-16 h-16 flex items-center justify-center
                                bg-${selectBoxColor(rowIndex, colIndex)}
                                font-bold text-xl
                            `}
                        >
                            {box}
                        </div>
                    ))
                ))}
            </div>
        </main>
    )
}