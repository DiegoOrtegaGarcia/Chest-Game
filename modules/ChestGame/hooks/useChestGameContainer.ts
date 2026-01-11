import { createNewBoard } from "@/modules/ChestGame/lib/chestGameUtilts"
import { useState } from "react"
import { Piece } from "../types/chestGameTypes"

export const useChestGameContainer =()=>{

    const [board, setBoard] = useState<Piece[][]>(createNewBoard())

    const selectBoxColor = (rowIndex: number, colIndex: number) => {
        const result = (rowIndex + colIndex) % 2
        return result ? "bg-amber-200" : "bg-amber-800"   
    }

    const selectPiecesColor = (team:string)=>{
        if(team === "white") return 'text-white'
        if(team === "black") return 'text-black'
        return
    }
    return {board,selectBoxColor,selectPiecesColor}
}