import { createNewBoard} from '@/modules/ChestGame/lib/chestGameUtilts';
import '@testing-library/jest-dom'
 
const CHEST_BOARD_PIECES = [[2,3,4,8,9,4,3,2],[1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1],[2,3,4,8,9,4,3,2]]

describe('Home', () => {
  it('Create a 8x8 Array', () => {
    const board = createNewBoard();
    expect(Array.isArray(board)).toBe(true);
    expect(board).toHaveLength(8)
    
    board.forEach((row)=>{
        expect(row).toHaveLength(8)
    })
  })

  it("Confirm Pieces Position",()=> {
    const board = createNewBoard();
    expect(board).toEqual(CHEST_BOARD_PIECES)
    board.forEach((row,rowIndex)=>(
        row.forEach((box,boxIndex)=>{
            expect(box).toEqual(CHEST_BOARD_PIECES[rowIndex][boxIndex])
        })
    ))
  })

})