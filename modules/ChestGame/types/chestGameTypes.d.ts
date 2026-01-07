export interface Piece {
    value: string;
    team: 'white' | 'black' | 'empty';
}

export interface PieceWithPosition {
  type: Piece;
  positon: [number, number];
}