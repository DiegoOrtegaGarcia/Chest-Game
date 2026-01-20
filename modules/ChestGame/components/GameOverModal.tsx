import Link from 'next/link';

interface GameOverModalProps {isOpen: boolean;winner: 'white' | 'black' | null;playerTeam: 'white' | 'black';onRestart: () => void;}

export const GameOverModal: React.FC<GameOverModalProps> = ({ isOpen, winner, playerTeam,onRestart }) => {
    if (!isOpen) return null;

    const playerWon = winner === playerTeam;
    const title = playerWon ? "¡Ganaste! 🏆" : "¡Perdiste! 😢";
    const message = playerWon ? "Felicidades, has ganado la partida." : `El equipo ${winner === 'white' ? 'blanco' : 'negro'} ha ganado.`;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl max-w-md w-full border-2 border-amber-600">
                <div className="text-center mb-6">
                    <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                        {title}
                    </h2>
                    <p className="text-gray-300 text-lg mb-2">{message}</p>
                    <p className="text-gray-400 text-sm">
                        {playerWon ? "¡Eres un maestro del ajedrez!" : "La próxima vez será mejor."}
                    </p>
                </div>
                
                <div className="flex flex-col gap-4">
                    <button
                        onClick={onRestart}
                        className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Jugar otra partida
                    </button>
                    
                    <Link href="/" className="block">
                        <button className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 border border-gray-600">
                            Volver al inicio
                        </button>
                    </Link>
                    
                    <div className="mt-4 pt-4 border-t border-gray-700">
                        <p className="text-gray-500 text-sm text-center">
                            Partida terminada • {winner === 'white' ? 'Blancas' : 'Negras'} ganan
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};