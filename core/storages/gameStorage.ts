import { create } from 'zustand';

interface GameStore {
  turn: "white" | "black";
  playerTeam: "white" | "black";
  setPlayerTeam: (team: "white" | "black") => void;
  changeTurn: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  turn: "white",
  playerTeam: "white",
  
  setPlayerTeam: (team) => set({ playerTeam: team }),
  
  changeTurn: () => set({ 
    turn: get().turn === "white" ? "black" : "white" 
  }),
}));