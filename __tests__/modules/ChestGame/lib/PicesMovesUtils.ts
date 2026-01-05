import { createNewBoard } from '@/modules/ChestGame/lib/chestGameUtilts';
import { getPosibelsMoves } from '@/modules/ChestGame/lib/piecesMovesUtils';

describe("Pieces Moves - Pawn Logic", () => {

  it("Peon No deberia poder Moverve por que esta bloqueado", () => {
    const board = createNewBoard();
    
    board[6][3] = { value: "♟", team: "white" };
    board[5][3] = { value: "♙", team: "black" };
    
    const piece = {
      type: board[6][3],
      positon: [6, 3] as [number, number]
    };
    
    const moves = getPosibelsMoves(piece, true, board);
    expect(moves).toEqual([]);
  });

  it("Peon bloqueado por todos lados por piezas Blancas", () => {
    const board = createNewBoard();
    
    board[6][3] = { value: "♟", team: "white" };
    board[5][3] = { value: "♟", team: "white" };
    
    const piece = {
      type: board[6][3],
      positon: [6, 3] as [number, number]
    };
    
    const moves = getPosibelsMoves(piece, true, board);
    
    expect(moves).toEqual([]);
  });

  it("Peon con casillas libres deberia poder moverse de uno a dos casillas adelante", () => {
    const board = createNewBoard();
    
    board[6][3] = { value: "♟", team: "white" };
    
    const piece = {
      type: board[6][3],
      positon: [6, 3] as [number, number]
    };
    
    const moves = getPosibelsMoves(piece, true, board);
    
    expect(moves).toEqual([[5, 3], [4, 3]]);
  });

  it("Peon deberia cazar los peones negros", () => {
    const board = createNewBoard();

    board[6][3] = { value: "♟", team: "white" };
    
    board[5][2] = { value: "♙", team: "black" };
    board[5][4] = { value: "♛", team: "black" };
    
    const piece = {
      type: board[6][3],
      positon: [6, 3] as [number, number]
    };
    
    const moves = getPosibelsMoves(piece, true, board);
    
    expect(moves).toEqual(expect.arrayContaining([
      [5, 3], [4, 3], [5, 2], [5, 4]
    ]));
    expect(moves).toHaveLength(4);
  });

  it("Peon blanco no mata mismo equipo", () => {
    const board = createNewBoard();
    
 
    board[6][3] = { value: "♟", team: "white" };
    board[5][2] = { value: "♟", team: "white" };
    board[5][4] = { value: "♟", team: "white" };
    
    const piece = {
      type: board[6][3],
      positon: [6, 3] as [number, number]
    };
    
    const moves = getPosibelsMoves(piece, true, board);
  
    expect(moves).toEqual([[5, 3], [4, 3]]);
  });
});