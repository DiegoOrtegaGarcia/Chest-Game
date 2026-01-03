import { createNewBoard} from '@/modules/ChestGame/lib/chestGameUtilts';
import '@testing-library/jest-dom'
 
const PIECES = {
  EMPTY: " ",
  PAWN: '♟',
  ROOK: '♜' ,
  KNIGHT: '♞',
  BISHOP: '♝' ,
  QUEEN: '♛' ,
  KING: '♚' ,
};

const CHEST_BOARD_PIECES = [
  [{value:PIECES.ROOK,team:"white"}, {value:PIECES.KNIGHT,team:'white'}, {value:PIECES.BISHOP,team:'white'}, {value:PIECES.QUEEN,team:'white'}, {value:PIECES.KING,team:'white'}, {value:PIECES.BISHOP,team:'white'}, {value:PIECES.KNIGHT,team:'white'}, {value:PIECES.ROOK,team:'white'}]
  ,Array(8).fill({value:PIECES.PAWN,team:'white'}),
  Array(8).fill({value:PIECES.EMPTY,team:'empty'}),
  Array(8).fill({value:PIECES.EMPTY,team:'empty'}),
  Array(8).fill({value:PIECES.EMPTY,team:'empty'}),
  Array(8).fill({value:PIECES.EMPTY,team:'empty'}),
  Array(8).fill({value:PIECES.PAWN,team:'black'}),
  [{value:PIECES.ROOK,team:"black"}, {value:PIECES.KNIGHT,team:'black'}, {value:PIECES.BISHOP,team:'black'}, {value:PIECES.QUEEN,team:'black'}, {value:PIECES.KING,team:'black'}, {value:PIECES.BISHOP,team:'black'}, {value:PIECES.KNIGHT,team:'black'}, {value:PIECES.ROOK,team:'black'}]]


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