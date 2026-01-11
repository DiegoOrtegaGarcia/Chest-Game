import { Piece } from "../../types/chestGameTypes";
import { filterMovesThatExposeCheck } from "../chestGameUtilts";
import {  getAllMovesSpecificUbication} from "./GeneralPieceLogic";

export const getKnightMoves = (piece: Piece,position: [number, number],board: Piece[][]): [number, number][] => {
  const basicMoves = getKnightBasicMoves(piece,position,board)
  return filterMovesThatExposeCheck(piece, position, basicMoves, board);
};

export const getKnightBasicMoves = (piece: Piece,position: [number, number],board: Piece[][]): [number, number][] => {
  const [row,col] = position
  const HorseMoves: [number, number][] = [[row - 2, col - 1],[row - 2, col + 1],[row + 2, col - 1],[row + 2, col + 1],[row - 1, col - 2],[row - 1, col + 2],[row + 1, col - 2],[row + 1, col + 2]];
  return getAllMovesSpecificUbication(HorseMoves,board,piece)
};
