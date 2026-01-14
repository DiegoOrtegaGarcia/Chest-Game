"use client"
import { useGameStore } from "@/core/storages/gameStorage";

export default function TeamSelector() {
  const { playerTeam, setPlayerTeam } = useGameStore();
  return (
    <div className="p-4 bg-white rounded-lg border shadow-sm">
      <h3 className="text-lg font-medium mb-3 text-gray-600 text-center">Selecciona tu equipo</h3>
      <div className="flex gap-3">
        <button
          className={`px-6 py-3 rounded border transition-colors ${
            playerTeam === 'white' 
              ? 'bg-gray-800 text-white border-gray-800' 
              : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => setPlayerTeam('white')}
        >
          Blancas
        </button>
        <button
          className={`px-6 py-3 rounded border transition-colors ${
            playerTeam === 'black' 
              ? 'bg-gray-800 text-white border-gray-800' 
              : 'bg-white text-gray-800 border-gray-800 hover:bg-gray-700'
          }`}
          onClick={() => setPlayerTeam('black')}
        >
          Negras
        </button>
      </div>
    </div>
  );
}