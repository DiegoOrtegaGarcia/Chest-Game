import { createPieceToTest } from "../PicesMovesUtils.test";
import { getPossibleMoves } from "@/modules/ChestGame/lib/moves/piecesMovesUtils";
import { PIECES } from "@/core/constants/constants";
import { createNewBoard } from "@/modules/ChestGame/lib/board/boardUtils";

describe("Pawm Move Logic",()=>{
    it("Peon No deberia poder Moverve por que esta bloqueado", () => {
        const board = createNewBoard();
        const whitePawn = createPieceToTest(board,PIECES.PAWN,"white",[6,3])
        createPieceToTest(board,PIECES.PAWN,"black",[5,3])
    
        const moves = getPossibleMoves(whitePawn, true, board);
        expect(moves).toEqual([]);
      });
    
      it("Peon No deberia poder Moverve por que esta bloqueado pero ahora del otro equipo", () => {
        const board = createNewBoard();
        const blackPawn = createPieceToTest(board,PIECES.PAWN,"black",[1,3])
        createPieceToTest(board,PIECES.PAWN,"white",[2,3])
    
        const moves = getPossibleMoves(blackPawn, true, board);
        expect(moves).toEqual([]);
      });
    
      it("Peon bloqueado por todos lados por piezas Blancas", () => {
        const board = createNewBoard();
        const whitePawn = createPieceToTest(board,PIECES.PAWN,"white",[6,3])
        createPieceToTest(board,PIECES.PAWN,"white",[5,3])
    
        const moves = getPossibleMoves(whitePawn, true, board);
        expect(moves).toEqual([]);
      });
    
      it("Peon con casillas libres deberia poder moverse de uno a dos casillas adelante ", () => {
        const board = createNewBoard();
        const whitePawn = createPieceToTest(board,PIECES.PAWN,"white",[6,3])
        const blackPawn = createPieceToTest(board,PIECES.PAWN,"black",[1,3])
    
        const movesWhitePawn = getPossibleMoves(whitePawn, true, board);
        expect(movesWhitePawn).toEqual([[5, 3], [4, 3]]);
        const movesBlackPawn = getPossibleMoves(blackPawn, true, board);
        expect(movesBlackPawn).toEqual([[2, 3], [3, 3]]);
      });
    
      it("Peon deberia cazar los peones negros", () => {
        const board = createNewBoard();
        const whitePawn = createPieceToTest(board,PIECES.PAWN,"white",[6,3])
        createPieceToTest(board,PIECES.PAWN,"black",[5,4])
        createPieceToTest(board,PIECES.QUEEN,"black",[5,2])
        
        const moves = getPossibleMoves(whitePawn, true, board);
        expect(moves).toEqual(expect.arrayContaining([
           [5, 2]
        ]));
      });
    
      it("Peon blanco no mata mismo equipo", () => {
        const board = createNewBoard();
        const whitePawn = createPieceToTest(board,PIECES.PAWN,"white",[6,3])
        createPieceToTest(board,PIECES.PAWN,"white",[5,2])
        createPieceToTest(board,PIECES.PAWN,"white",[5,4])
        
        const moves = getPossibleMoves(whitePawn, true, board);
        expect(moves).toEqual([[5, 3], [4, 3]]);
      });
})