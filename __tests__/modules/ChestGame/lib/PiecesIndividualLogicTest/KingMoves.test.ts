import { getPossibleMoves } from "@/modules/ChestGame/lib/moves/piecesMovesUtils";
import { createEmptyBoard, createPieceToTest } from "../PicesMovesUtils";
import { PIECES } from "@/core/constants/constants";

describe("King Moves Logic",()=>{
    it("Rey no debe moverse a casillas amenazadas por piezas enemigas",()=>{
      const board = createEmptyBoard()
      const whiteKing = createPieceToTest(board,PIECES.KING,"white",[4,4])
      createPieceToTest(board,PIECES.QUEEN,"black",[4,3])
      createPieceToTest(board,PIECES.QUEEN,"white",[4,5])
      const moves = getPossibleMoves(whiteKing,true,board)
      expect(moves).toEqual([[3,5], [4,3], [5,5]])
    })

    it("Rey en esquina solo tiene 3 direcciones", () => {
      const board = createEmptyBoard();
      const whiteKing = createPieceToTest(board, PIECES.KING, "white", [0, 0]);
      const moves = getPossibleMoves(whiteKing, true, board);
      expect(moves).toEqual([[0, 1],[1,0],[1,1]]);
    });

    it("No deberia poder moverse a una casilla amenazada por una pieza enemiga distinta",()=>{
        const board = createEmptyBoard();
        const whiteKing = createPieceToTest(board, PIECES.KING, "white", [0, 0]);
        createPieceToTest(board,PIECES.BISHOP,"black",[2,2])
        const moves = getPossibleMoves(whiteKing,true,board)
        expect(moves).not.toContainEqual([1,1])
        expect(moves).toEqual([[0,1], [1,0]])
    })
    it("Rey deberia poder capturar una pieza enemiga que no está defendida",()=>{
        const board = createEmptyBoard();
        const whiteKing = createPieceToTest(board, PIECES.KING, "white", [0, 0]);
        createPieceToTest(board,PIECES.PAWN,"black",[1,1])
        const moves = getPossibleMoves(whiteKing,true,board)
        expect(moves).toContainEqual([1,1])
    })
})