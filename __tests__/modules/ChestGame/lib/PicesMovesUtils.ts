import { createNewBoard } from '@/modules/ChestGame/lib/chestGameUtilts';
import { getPieceAt } from '@/modules/ChestGame/lib/PiecesIndividualLogic/GeneralPieceLogic';
import { getPosibelsMoves } from '@/modules/ChestGame/lib/piecesMovesUtils';
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

    expect(getPosibelsMoves(wrongPieceValue, true, board)).toBeNull()
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

  it("Alfil debería moverse en diagonales", () => {
      const board = createEmptyBoard();
      const whiteBishop=createPieceToTest(board,"♝","white",[3,3])
      const moves = getPosibelsMoves(whiteBishop, true, board);

      expect(moves).toContainEqual([0, 0]);
      expect(moves).toContainEqual([0, 6]); 
      expect(moves).toContainEqual([6, 0]);
      expect(moves).toContainEqual([7, 7]);
    });
    
    it("Alfil bloqueado por piezas aliadas", () => {
      const board = createEmptyBoard();
      const whiteBishop=createPieceToTest(board,"♝","white",[3,3])
      createPieceToTest(board,"♟","white",[2,2]);
      createPieceToTest(board,"♟","white",[2,4]);
      
      const moves = getPosibelsMoves(whiteBishop, true, board);
      expect(moves).not.toContainEqual([2, 2]);
      expect(moves).not.toContainEqual([2, 4]);
    });
    
    it("Alfil captura piezas enemigas", () => {
      const board = createEmptyBoard();
      const whiteBishop=createPieceToTest(board,"♝","white",[3,3])
      createPieceToTest(board,"♟","black",[1,1]);
      createPieceToTest(board,"♟","black",[2,4]);    
      const moves = getPosibelsMoves(whiteBishop, true, board);
      
      expect(moves).toContainEqual([1, 1]);
      expect(moves).not.toContainEqual([0, 0]);
    });

    it("Caballo no puede moverse a casillas con piezas aliadas", () => {
      const board = createEmptyBoard();
      const whiteHorse = createPieceToTest(board,"♞","white",[4,4])
      createPieceToTest(board,"♟","white",[2,3])
     
      const moves = getPosibelsMoves(whiteHorse, true, board);
      expect(moves).not.toContainEqual([2, 3]);
      expect(moves).toContainEqual([2, 5]);
    });

  it("Caballo puede capturar piezas enemigas", () => {
      const board = createEmptyBoard();
      const whiteHorse = createPieceToTest(board,"♞","white",[4,4])
      createPieceToTest(board,"♟","black",[2,5])
      
      const moves = getPosibelsMoves(whiteHorse, true, board);
      expect(moves).toContainEqual([2, 5]);
  });
  it("Caballor en el borde no deberia salirse del board",()=>{
      const board = createEmptyBoard();
      const whiteHorse = createPieceToTest(board,"♞","white",[0,7])
      const moves = getPosibelsMoves(whiteHorse, true, board);
      expect(moves).not.toContainEqual([1,9])
  })
  it("Comprobar Reina Movimientos",() =>{
    const board = createEmptyBoard()
    const whiteQueen= createPieceToTest(board,"♛","white",[4,3])
    const moves = getPosibelsMoves(whiteQueen,true,board)
    expect(moves).toContainEqual([0,7]);
    expect(moves).toContainEqual([1,0]);
    expect(moves).toContainEqual([7,6]);
    expect(moves).toContainEqual([4,0]);
    expect(moves).toContainEqual([4,7]);
    expect(moves).toContainEqual([7,3]);
    expect(moves).toContainEqual([0,3]);
    expect(moves).toContainEqual([7,0]);
  })
  it("Reina bloqueada por piezas aliadas no puede pasar", () => {
    const board = createEmptyBoard();
    const whiteQueen = createPieceToTest(board, "♛", "white", [3, 3]);
    createPieceToTest(board, "♟", "white", [2, 2]);
    createPieceToTest(board, "♟", "white", [2, 3]);
    createPieceToTest(board, "♟", "white", [2, 4]);
    createPieceToTest(board, "♟", "white", [3, 2]);
    createPieceToTest(board, "♟", "white", [3, 4]);
    createPieceToTest(board, "♟", "white", [4, 2]);
    createPieceToTest(board, "♟", "white", [4, 3]);
    createPieceToTest(board, "♟", "white", [4, 4]);

    const moves = getPosibelsMoves(whiteQueen, true, board);
    expect(moves).not.toContainEqual([2, 2]);
    expect(moves).not.toContainEqual([2, 3]);
    expect(moves).not.toContainEqual([2, 4]);
    expect(moves).not.toContainEqual([3, 2]);
    expect(moves).not.toContainEqual([3, 4]);
    expect(moves).not.toContainEqual([4, 2]);
    expect(moves).not.toContainEqual([4, 3]);
    expect(moves).not.toContainEqual([4, 4]);
    expect(moves).toEqual([]);
  });

  it("Reina captura piezas enemigas y se detiene", () => {
      const board = createEmptyBoard();
      const whiteQueen = createPieceToTest(board, "♛", "white", [3, 3]);

      createPieceToTest(board, "♙", "black", [1, 1]);
      createPieceToTest(board, "♙", "black", [1, 3]);
      createPieceToTest(board, "♙", "black", [1, 5]);
      createPieceToTest(board, "♙", "black", [3, 1]);
      createPieceToTest(board, "♙", "black", [3, 5]);
      createPieceToTest(board, "♙", "black", [5, 1]);
      createPieceToTest(board, "♙", "black", [5, 3]);
      createPieceToTest(board, "♙", "black", [5, 5]);

      const moves = getPosibelsMoves(whiteQueen, true, board);
      expect(moves).toContainEqual([1, 1]);
      expect(moves).toContainEqual([1, 3]);
      expect(moves).toContainEqual([1, 5]);
      expect(moves).toContainEqual([3, 1]);
      expect(moves).toContainEqual([3, 5]);
      expect(moves).toContainEqual([5, 1]);
      expect(moves).toContainEqual([5, 3]);
      expect(moves).toContainEqual([5, 5]);
      expect(moves).not.toContainEqual([0, 0]);
      expect(moves).not.toContainEqual([0, 3]);
      expect(moves).not.toContainEqual([0, 6]);
      expect(moves).not.toContainEqual([3, 0]);
      expect(moves).not.toContainEqual([3, 7]);
      expect(moves).not.toContainEqual([6, 0]);
      expect(moves).not.toContainEqual([7, 3]);
      expect(moves).not.toContainEqual([7, 7]);
    });

  it("Reina en esquina solo tiene 3 direcciones", () => {
      const board = createEmptyBoard();
      const whiteQueen = createPieceToTest(board, "♛", "white", [0, 0]);

      const moves = getPosibelsMoves(whiteQueen, true, board);
      expect(moves).toHaveLength(21);
      expect(moves).toContainEqual([7, 0]);
      expect(moves).toContainEqual([0, 7]);
      expect(moves).toContainEqual([7, 7]);
    });

  it("Reina en borde lateral (no esquina) tiene 5 direcciones", () => {
    const board = createEmptyBoard();
    const whiteQueen = createPieceToTest(board, "♛", "white", [0, 3]);

    const moves = getPosibelsMoves(whiteQueen, true, board);
    expect(moves).toHaveLength(21);
  });
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