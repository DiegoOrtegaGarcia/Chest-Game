import { Piece } from "../../types/chestGameTypes";
import { getAllMovesSpecificUbication} from "./GeneralPieceLogic";

export const getKingMoves = (piece : Piece, position :[number,number], board : Piece[][]) => {
    const [row,col] = position
    const KingMoves: [number, number][] = [[row - 1, col - 1],[row - 1, col],[row - 1, col + 1],[row,col-1],[row, col + 1],[row + 1, col - 1],[row + 1, col],[row + 1, col + 1]];
    return getAllMovesSpecificUbication(KingMoves,board,piece)
}
