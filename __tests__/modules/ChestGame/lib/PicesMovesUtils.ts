import { BOARD_SIZE, PIECES } from '@/core/constants/constants';
import { createNewBoard } from '@/modules/ChestGame/lib/chestGameUtilts';
import { getPieceAt } from '@/modules/ChestGame/lib/PiecesIndividualLogic/GeneralPieceLogic';
import { getPossibleMoves } from '@/modules/ChestGame/lib/piecesMovesUtils';
import { Piece } from '@/modules/ChestGame/types/chestGameTypes';

describe("Pieces Moves", () => {

  it("Comprobar que getPieceAt Funcione",()=>{
    const board = createNewBoard();
    const wrongPositon : [number,number]= [8,8]
    const correctPosition : [number,number] = [0,0]

    expect(getPieceAt(board,wrongPositon)).toEqual(null)
    expect(getPieceAt(board,correctPosition)).toEqual(board[0][0])
  })

  it("Comprobar que cuando se pasa un valor que no es el de una ficha devuelve null",()=>{
    const board = createEmptyBoard();
    const wrongPieceValue=createPieceToTest(board,"1","black",[5,3])

    expect(getPossibleMoves(wrongPieceValue, true, board)).toBeNull()
  })
});

export const createEmptyBoard=()=>{
  const board : Piece[][]= [] 
  for (let index = 0; index < BOARD_SIZE; index++) {
    const box = Array(8).fill({value:PIECES.EMPTY,team:'empty'})
    board.push(box)
  }
  return board
}

export const createPieceToTest=(board:Piece[][],value : string, team : "empty" | "white" | "black" ,position : [number,number])=>{
    const [row,col] = position
    board[row][col] = {value: value,team:team}
    return {type : board[row][col] , position}
}