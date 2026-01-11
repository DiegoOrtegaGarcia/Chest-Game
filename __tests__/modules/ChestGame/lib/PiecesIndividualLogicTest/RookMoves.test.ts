import { createPieceToTest } from "../PicesMovesUtils";
import { getPossibleMoves } from "@/modules/ChestGame/lib/moves/piecesMovesUtils";
import { PIECES } from "@/core/constants/constants";
import { createNewBoard } from "@/modules/ChestGame/lib/board/boardUtils";

describe("Torre Move Logig Tests",()=>{
    it("Torre deberia poder caminar hacia Arriba",()=>{
        const board = createNewBoard();
        const whiteRook=createPieceToTest(board,PIECES.ROOK,"white",[7,0])
        createPieceToTest(board,PIECES.EMPTY,"empty",[6,0])
    
        const moves = getPossibleMoves(whiteRook, true, board);
        expect(moves).toEqual([[6,0],[5,0],[4,0],[3,0],[2,0],[1,0]]);
      })
      
    it("Torre deberia poder caminar hacia Arriba",()=>{
        const board = createNewBoard();
        const whiteRook=createPieceToTest(board,PIECES.ROOK,"white",[7,0])
        createPieceToTest(board,PIECES.EMPTY,"empty",[6,0])
    
        const moves = getPossibleMoves(whiteRook, true, board);
        expect(moves).toEqual([[6,0],[5,0],[4,0],[3,0],[2,0],[1,0]]);
      })
})