import { PIECES } from "@/core/constants/constants";
import { createEmptyBoard, createPieceToTest } from "../PicesMovesUtils";
import { getPossibleMoves } from "@/modules/ChestGame/lib/piecesMovesUtils";

describe("Knight Move Logic", () =>{
    it("Caballo no puede moverse a casillas con piezas aliadas", () => {
      const board = createEmptyBoard();
      const whiteHorse = createPieceToTest(board,PIECES.KNIGHT,"white",[4,4])
      createPieceToTest(board,PIECES.PAWN,"white",[2,3])
      
      const moves = getPossibleMoves(whiteHorse, true, board);
      expect(moves).not.toContainEqual([2, 3]);
      expect(moves).toContainEqual([2, 5]);
    });

    it("Caballo puede capturar piezas enemigas", () => {
      const board = createEmptyBoard();
      const whiteHorse = createPieceToTest(board,PIECES.KNIGHT,"white",[4,4])
      createPieceToTest(board,PIECES.PAWN,"black",[2,5])
      
      const moves = getPossibleMoves(whiteHorse, true, board);
      expect(moves).toContainEqual([2, 5]);
    });
    it("Caballor en el borde no deberia salirse del board",()=>{
      const board = createEmptyBoard();
      const whiteHorse = createPieceToTest(board,PIECES.KNIGHT,"white",[0,7])
      const moves = getPossibleMoves(whiteHorse, true, board);
      expect(moves).not.toContainEqual([1,9])
    })
})