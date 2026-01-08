import { getPossibleMoves } from "@/modules/ChestGame/lib/piecesMovesUtils"
import { createEmptyBoard, createPieceToTest } from "../PicesMovesUtils"
import { PIECES } from "@/core/constants/constants"

describe("Queen Moves Logic", ()=>{
    it("Comprobar Reina Movimientos",() =>{
    const board = createEmptyBoard()
    const whiteQueen= createPieceToTest(board,PIECES.QUEEN,"white",[4,3])
    const moves = getPossibleMoves(whiteQueen,true,board)
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
    const whiteQueen = createPieceToTest(board, PIECES.QUEEN, "white", [3, 3]);
    createPieceToTest(board, PIECES.PAWN, "white", [2, 2]);
    createPieceToTest(board, PIECES.PAWN, "white", [2, 3]);
    createPieceToTest(board, PIECES.PAWN, "white", [2, 4]);
    createPieceToTest(board, PIECES.PAWN, "white", [3, 2]);
    createPieceToTest(board, PIECES.PAWN, "white", [3, 4]);
    createPieceToTest(board, PIECES.PAWN, "white", [4, 2]);
    createPieceToTest(board, PIECES.PAWN, "white", [4, 3]);
    createPieceToTest(board, PIECES.PAWN, "white", [4, 4]);

    const moves = getPossibleMoves(whiteQueen, true, board);
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
      const whiteQueen = createPieceToTest(board, PIECES.QUEEN, "white", [3, 3]);

      createPieceToTest(board, PIECES.PAWN, "black", [1, 1]);
      createPieceToTest(board, PIECES.PAWN, "black", [1, 3]);
      createPieceToTest(board, PIECES.PAWN, "black", [1, 5]);
      createPieceToTest(board, PIECES.PAWN, "black", [3, 1]);
      createPieceToTest(board, PIECES.PAWN, "black", [3, 5]);
      createPieceToTest(board, PIECES.PAWN, "black", [5, 1]);
      createPieceToTest(board, PIECES.PAWN, "black", [5, 3]);
      createPieceToTest(board, PIECES.PAWN, "black", [5, 5]);

      const moves = getPossibleMoves(whiteQueen, true, board);
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
      const whiteQueen = createPieceToTest(board, PIECES.QUEEN, "white", [0, 0]);

      const moves = getPossibleMoves(whiteQueen, true, board);
      expect(moves).toHaveLength(21);
      expect(moves).toContainEqual([7, 0]);
      expect(moves).toContainEqual([0, 7]);
      expect(moves).toContainEqual([7, 7]);
    });

  it("Reina en borde lateral (no esquina) tiene 5 direcciones", () => {
    const board = createEmptyBoard();
    const whiteQueen = createPieceToTest(board, PIECES.QUEEN, "white", [0, 3]);

    const moves = getPossibleMoves(whiteQueen, true, board);
    expect(moves).toHaveLength(21);
  });
})