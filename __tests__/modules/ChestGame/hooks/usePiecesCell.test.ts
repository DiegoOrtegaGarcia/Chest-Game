import { useCellPiecesCell } from '@/modules/ChestGame/hooks/cellPiecesCell'
import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react'

describe('useCellPiecesCellHook', () => {
    const {result} = renderHook(()=>useCellPiecesCell([],[4,4]))

  it("Test the Boxes Color",()=>{
    const rowIndex = 4
    const colIndex =2
    const color = result.current.selectBoxColor(rowIndex,colIndex)
    expect (color).toEqual("bg-amber-800")
  })

})