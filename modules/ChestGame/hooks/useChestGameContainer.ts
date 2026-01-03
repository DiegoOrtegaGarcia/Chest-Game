import { createNewBoard } from "@/modules/ChestGame/lib/chestGameUtilts"
import { useState } from "react"

export const useChestGameContainer =()=>{

    const [board, setBoard] = useState<number[][]>(createNewBoard())

    const selectBoxColor = (rowIndex: number, colIndex: number) => {
        const result = (rowIndex + colIndex) % 2
        return result ?   "white" : "black" 
    }

    return {board,selectBoxColor}
}