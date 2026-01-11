import { useChestGameContainer } from '@/modules/ChestGame/hooks/useChestGameContainer'
import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react'

describe('useChestGameContainerHook', () => {
    const {result} = renderHook(()=>useChestGameContainer())

  it("Test the Boxes Color",()=>{
    const rowIndex = 4
    const colIndex =2
    const color = result.current.selectBoxColor(rowIndex,colIndex)
    expect (color).toEqual("bg-amber-800")
  })
})