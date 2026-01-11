import { getPossibleMoves } from "@/modules/ChestGame/lib/piecesMovesUtils";
import { createEmptyBoard, createPieceToTest } from "../PicesMovesUtils";
import { PIECES } from "@/core/constants/constants";

describe('Bishop Move Logic',()=>{
     it("Alfil debería moverse en diagonales", () => {
        const board = createEmptyBoard();
        const whiteBishop=createPieceToTest(board,PIECES.BISHOP,"white",[3,3])
        createPieceToTest(board,PIECES.BISHOP,"white",[7,3])
        const moves = getPossibleMoves(whiteBishop, true, board);

        expect(moves).toContainEqual([0, 0]);
        expect(moves).toContainEqual([0, 6]); 
        expect(moves).toContainEqual([6, 0]);
        expect(moves).toContainEqual([7, 7]);
    });
    
    it("Alfil bloqueado por piezas aliadas", () => {
      const board = createEmptyBoard();
      const whiteBishop=createPieceToTest(board,PIECES.BISHOP,"white",[3,3])
      createPieceToTest(board,PIECES.PAWN,"white",[2,2]);
      createPieceToTest(board,PIECES.PAWN,"white",[2,4]);
      
      const moves = getPossibleMoves(whiteBishop, true, board);
      expect(moves).not.toContainEqual([2, 2]);
      expect(moves).not.toContainEqual([2, 4]);
    });
    
    it("Alfil captura piezas enemigas", () => {
      const board = createEmptyBoard();
      const whiteBishop=createPieceToTest(board,PIECES.BISHOP,"white",[3,3])
      createPieceToTest(board,PIECES.PAWN,"black",[1,1]);
      createPieceToTest(board,PIECES.PAWN,"black",[2,4]);    
      const moves = getPossibleMoves(whiteBishop, true, board);
      
      expect(moves).toContainEqual([1, 1]);
      expect(moves).not.toContainEqual([0, 0]);
    });
})