import { GameOverModal } from '@/modules/ChestGame/components/GameOverModal';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

const mockOnRestart = jest.fn();

describe('GameOverModal', () => {
    it('should not render when isOpen is false', () => {
        render(<GameOverModal isOpen={false}winner="white"playerTeam="white"onRestart={mockOnRestart}/>);
        expect(screen.queryByText('¡Ganaste!')).not.toBeInTheDocument();
    });

    it('should show "¡Ganaste!" when player wins', () => {
        render(<GameOverModal isOpen={true}winner="white"playerTeam="white"onRestart={mockOnRestart}/>);
        expect(screen.getByText('¡Ganaste! 🏆')).toBeInTheDocument();
        expect(screen.getByText('Felicidades, has ganado la partida.')).toBeInTheDocument();
    });

    it('should show "¡Perdiste!" when player loses', () => {
        render(<GameOverModal isOpen={true}winner="black"playerTeam="white"onRestart={mockOnRestart}/>);
        expect(screen.getByText('¡Perdiste! 😢')).toBeInTheDocument();
        expect(screen.getByText('El equipo negro ha ganado.')).toBeInTheDocument();
    });

    it('should call onRestart when restart button is clicked', () => {
        render(<GameOverModal isOpen={true}winner="white"playerTeam="white"onRestart={mockOnRestart}/>);
        const restartButton = screen.getByText('Jugar otra partida');
        fireEvent.click(restartButton);
        expect(mockOnRestart).toHaveBeenCalledTimes(1);
    });

    it('should have a link to home page', () => {
        render(<GameOverModal isOpen={true}winner="white"playerTeam="white"onRestart={mockOnRestart}/>);
        const homeButton = screen.getByText('Volver al inicio');
        expect(homeButton).toBeInTheDocument();
    });
});