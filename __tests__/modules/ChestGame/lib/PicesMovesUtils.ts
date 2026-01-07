import { createNewBoard } from '@/modules/ChestGame/lib/chestGameUtilts';
import { getPieceAt, getPosibelsMoves } from '@/modules/ChestGame/lib/piecesMovesUtils';
import { Piece } from '@/modules/ChestGame/types/chestGameTypes';

describe("Pieces Moves - Pawn Logic", () => {

  it("Comprobar que getPieceAt Funcione",()=>{
    const board = createNewBoard();
    const wrongPositon : [number,number]= [8,8]
    const correctPosition : [number,number] = [0,0]

    expect(getPieceAt(board,wrongPositon)).toEqual(null)
    expect(getPieceAt(board,correctPosition)).toEqual(board[0][0])
  })
  it("Peon No deberia poder Moverve por que esta bloqueado", () => {
    const board = createNewBoard();
    const whitePawn = createPieceToTest(board,"♟","white",[6,3])
    createPieceToTest(board,"♟","black",[5,3])

    const moves = getPosibelsMoves(whitePawn, true, board);
    expect(moves).toEqual([]);
  });
  it("Peon No deberia poder Moverve por que esta bloqueado pero ahora del otro equipo", () => {
    const board = createNewBoard();
    const blackPawn = createPieceToTest(board,"♟","black",[1,3])
    createPieceToTest(board,"♟","white",[2,3])

    const moves = getPosibelsMoves(blackPawn, true, board);
    expect(moves).toEqual([]);
  });

  it("Peon bloqueado por todos lados por piezas Blancas", () => {
    const board = createNewBoard();
    const whitePawn = createPieceToTest(board,"♟","white",[6,3])
    createPieceToTest(board,"♟","white",[5,3])

    const moves = getPosibelsMoves(whitePawn, true, board);
    expect(moves).toEqual([]);
  });

  it("Peon con casillas libres deberia poder moverse de uno a dos casillas adelante ", () => {
    const board = createNewBoard();
    const whitePawn = createPieceToTest(board,"♟","white",[6,3])
    const blackPawn = createPieceToTest(board,"♟","black",[1,3])

    const movesWhitePawn = getPosibelsMoves(whitePawn, true, board);
    expect(movesWhitePawn).toEqual([[5, 3], [4, 3]]);
    const movesBlackPawn = getPosibelsMoves(blackPawn, true, board);
    expect(movesBlackPawn).toEqual([[2, 3], [3, 3]]);
  });

  it("Peon deberia cazar los peones negros", () => {
    const board = createNewBoard();
    const whitePawn = createPieceToTest(board,"♟","white",[6,3])
    createPieceToTest(board,"♟","black",[5,4])
    createPieceToTest(board,"♛","black",[5,2])
    
    const moves = getPosibelsMoves(whitePawn, true, board);
    expect(moves).toEqual(expect.arrayContaining([
      [5, 3], [4, 3], [5, 2], [5, 4]
    ]));
    expect(moves).toHaveLength(4);
  });

  it("Peon blanco no mata mismo equipo", () => {
    const board = createNewBoard();
    const whitePawn = createPieceToTest(board,"♟","white",[6,3])
    createPieceToTest(board,"♟","white",[5,2])
    createPieceToTest(board,"♟","white",[5,4])
    
    const moves = getPosibelsMoves(whitePawn, true, board);
    expect(moves).toEqual([[5, 3], [4, 3]]);
  });

  it("Torre deberia poder caminar hacia Arriba",()=>{
    const board = createNewBoard();
    const whiteRook=createPieceToTest(board,"♜","white",[7,0])
    createPieceToTest(board," ","empty",[6,0])

    const moves = getPosibelsMoves(whiteRook, true, board);
    expect(moves).toEqual([[6,0],[5,0],[4,0],[3,0],[2,0],[1,0]]);
  })

  it("Alfil Testiar Movimientos",()=>{
    const board = createEmptyBoard();
    const whiteBishop=createPieceToTest(board,"♝","white",[7,2])
    
    const moves = getPosibelsMoves(whiteBishop,true,board)
    expect(moves).toEqual([[6,1],[5,0],[6,3],[5,4],[4,5],[3,6],[2,7]])
  })
});

const createEmptyBoard=()=>{
  const board : Piece[][]= [] 
  for (let index = 0; index < 8; index++) {
    const box = Array(8).fill({value:" ",team:'empty'})
    board.push(box)
  }
  return board
}

const createPieceToTest=(board:Piece[][],value : string, team : "empty" | "white" | "black" ,positon : [number,number])=>{
    const [row,col] = positon
    board[row][col] = {value: value,team:team}
    return {type : board[row][col] , positon}
}