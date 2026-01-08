import { getPossibleMoves } from "@/modules/ChestGame/lib/piecesMovesUtils"
import { createEmptyBoard, createPieceToTest } from "../PicesMovesUtils"
import { PIECES } from "@/core/constants/constants"

describe("King Moves Logic",()=>{
    it("Rey deberia poder moverse en todos los bloques alrededor de el donde hay enemigo pero no donde aliado",()=>{
      const board = createEmptyBoard()
      const whiteKing = createPieceToTest(board,PIECES.KING,"white",[4,4])
      createPieceToTest(board,PIECES.QUEEN,"black",[4,3])
      createPieceToTest(board,PIECES.QUEEN,"white",[4,5])
      const moves = getPossibleMoves(whiteKing,true,board)
      expect(moves).toEqual([[3,3],[3,4],[3,5],[4,3],[5,3],[5,4],[5,5]])
    })

    it("Rey en esquina solo tiene 3 direcciones", () => {
      const board = createEmptyBoard();
      const whiteKing = createPieceToTest(board, PIECES.KING, "white", [0, 0]);
      const moves = getPossibleMoves(whiteKing, true, board);
      expect(moves).toEqual([[0, 1],[1,0],[1,1]]);
    });

    it("No deberia poder moverse adelante pq ese lugar esta amenzado",()=>{
        const board = createEmptyBoard();
        const whiteKing = createPieceToTest(board, PIECES.KING, "white", [0, 0]);
        createPieceToTest(board,PIECES.BISHOP,"black",[1,1])
        const moves = getPossibleMoves(whiteKing,true,board)
        expect(moves).not.toContainEqual([1,1])
    })
})