export type Position = {
  x: number;
  y: number;
};

export type Piece = 'tiger' | 'goat' | null;

export type GamePhase = 'placing' | 'moving';

export type GameState = {
  board: (Piece)[];
  phase: GamePhase;
  currentPlayer: 'tiger' | 'goat';
  goatsToPlace: number;
  capturedGoats: number;
  selectedPiece: Position | null;
  validMoves: Position[];
};

export type Score = {
  playerName: string;
  score: number;
  date: string;
  gameType: 'tiger' | 'goat';
};