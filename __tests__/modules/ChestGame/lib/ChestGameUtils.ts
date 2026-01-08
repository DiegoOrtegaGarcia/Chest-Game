import { BOARD_SIZE, PIECES } from '@/core/constants/constants';
import { createNewBoard} from '@/modules/ChestGame/lib/chestGameUtilts';
import '@testing-library/jest-dom'

const teamSelection = false ;

const selectTeamByChoice = (teamSelection:boolean)=>{
    return teamSelection ? "white" :"black"
}

const CHEST_BOARD_PIECES = [
  [{value:PIECES.ROOK,team: teamSelection ? selectTeamByChoice(teamSelection) : selectTeamByChoice(!teamSelection)}, {value:PIECES.KNIGHT,team:teamSelection  ?selectTeamByChoice(teamSelection) : selectTeamByChoice(!teamSelection)}, {value:PIECES.BISHOP,team:teamSelection ?selectTeamByChoice(teamSelection) : selectTeamByChoice(!teamSelection)}, {value:PIECES.QUEEN,team:teamSelection ?selectTeamByChoice(teamSelection) : selectTeamByChoice(!teamSelection)}, {value:PIECES.KING,team:teamSelection ?selectTeamByChoice(teamSelection) : selectTeamByChoice(!teamSelection)}, {value:PIECES.BISHOP,team:teamSelection ?selectTeamByChoice(teamSelection) : selectTeamByChoice(!teamSelection)}, {value:PIECES.KNIGHT,team:teamSelection ?selectTeamByChoice(teamSelection) : selectTeamByChoice(!teamSelection)}, {value:PIECES.ROOK,team:teamSelection ?selectTeamByChoice(teamSelection) : selectTeamByChoice(!teamSelection)}]
  ,Array(8).fill({value:PIECES.PAWN,team:teamSelection  ? selectTeamByChoice(teamSelection) : selectTeamByChoice(!teamSelection)}),
  Array(8).fill({value:PIECES.EMPTY,team:'empty'}),
  Array(8).fill({value:PIECES.EMPTY,team:'empty'}),
  Array(8).fill({value:PIECES.EMPTY,team:'empty'}),
  Array(8).fill({value:PIECES.EMPTY,team:'empty'}),
  Array(8).fill({value:PIECES.PAWN,team:teamSelection ? selectTeamByChoice(!teamSelection) : selectTeamByChoice(teamSelection)}),
  [{value:PIECES.ROOK,team:teamSelection ?selectTeamByChoice(!teamSelection) : selectTeamByChoice(teamSelection)}, {value:PIECES.KNIGHT,team:teamSelection ?selectTeamByChoice(!teamSelection) : selectTeamByChoice(teamSelection)}, {value:PIECES.BISHOP,team:teamSelection ?selectTeamByChoice(!teamSelection) : selectTeamByChoice(teamSelection)}, {value:PIECES.QUEEN,team:teamSelection ?selectTeamByChoice(!teamSelection) : selectTeamByChoice(teamSelection)}, {value:PIECES.KING,team:teamSelection ?selectTeamByChoice(!teamSelection) : selectTeamByChoice(teamSelection)}, {value:PIECES.BISHOP,team:teamSelection ?selectTeamByChoice(!teamSelection) : selectTeamByChoice(teamSelection)}, {value:PIECES.KNIGHT,team:teamSelection ?selectTeamByChoice(!teamSelection) : selectTeamByChoice(teamSelection)}, {value:PIECES.ROOK,team:teamSelection ?selectTeamByChoice(!teamSelection) : selectTeamByChoice(teamSelection)}]]



describe('Home', () => {
  it('Create a 8x8 Array', () => {
    const board = createNewBoard(teamSelection);
    expect(Array.isArray(board)).toBe(true);
    expect(board).toHaveLength(BOARD_SIZE)
    
    board.forEach((row)=>{
        expect(row).toHaveLength(BOARD_SIZE)
    })
  })

  it("Confirm Pieces Position",()=> {
    const board = createNewBoard(teamSelection);
    expect(board).toEqual(CHEST_BOARD_PIECES)
    board.forEach((row,rowIndex)=>(
        row.forEach((box,boxIndex)=>{
            expect(box).toEqual(CHEST_BOARD_PIECES[rowIndex][boxIndex])
        })
    ))
  })

})