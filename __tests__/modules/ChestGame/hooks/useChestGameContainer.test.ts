import { renderHook, act } from '@testing-library/react';
import { useChestGameContainer } from '@/modules/ChestGame/hooks/useChestGameContainer';
import { PIECES } from '@/core/constants/constants';

describe('useChestGameContainer', () => {
    it('should initialize with a new board', () => {
        const { result } = renderHook(() => useChestGameContainer());
        
        expect(result.current.board).toHaveLength(8);
        expect(result.current.board[0]).toHaveLength(8);
        expect(result.current.selectedPiece).toBeNull();
        expect(result.current.possibleMoves).toHaveLength(0);
    });

    it('should select a piece when clicking on non-empty cell', () => {
        const { result } = renderHook(() => useChestGameContainer());

        act(() => {
            result.current.handleCellClick(
                { value: PIECES.PAWN, team: 'white' },
                [6, 0]
            );
        });

        expect(result.current.selectedPiece).not.toBeNull();
        expect(result.current.selectedPiece?.piece.value).toBe(PIECES.PAWN);
        expect(result.current.selectedPiece?.position).toEqual([6, 0]);
    });

    it('should not select a piece when clicking on empty cell', () => {
        const { result } = renderHook(() => useChestGameContainer());
        
        act(() => {
            result.current.handleCellClick(
                { value: PIECES.EMPTY, team: 'empty' },
                [4, 4]
            );
        });

        expect(result.current.selectedPiece).toBeNull();
    });

    it('should show possible moves when piece is selected', () => {
        const { result } = renderHook(() => useChestGameContainer());

        act(() => {
            result.current.handleCellClick(
                { value: PIECES.PAWN, team: 'white' },
                [6, 0]
            );
        });

  
        expect(result.current.possibleMoves.length).toBe(2);
        expect(result.current.possibleMoves).toEqual(expect.arrayContaining([
            [5, 0], [4, 0]
        ]));
    });

    it('should move a piece when clicking on valid move', () => {
        const { result } = renderHook(() => useChestGameContainer());
        
        act(() => {
            result.current.handleCellClick(
                { value: PIECES.PAWN, team: 'white' },
                [6, 0]
            );
        });
        act(() => {
            result.current.handleCellClick(
                { value: PIECES.EMPTY, team: 'empty' },
                [5, 0]
            );
        });

        expect(result.current.board[5][0].value).toBe(PIECES.PAWN);
        expect(result.current.board[6][0].value).toBe(PIECES.EMPTY);
        expect(result.current.selectedPiece).toBeNull();
        expect(result.current.possibleMoves).toHaveLength(0);
    });

    it('should not move piece when clicking on invalid position', () => {
        const { result } = renderHook(() => useChestGameContainer());
        
        act(() => {
            result.current.handleCellClick(
                { value: PIECES.PAWN, team: 'white' },
                [6, 0]
            );
        });

        const initialBoard = JSON.parse(JSON.stringify(result.current.board));
        
        act(() => {
            result.current.handleCellClick(
                { value: PIECES.EMPTY, team: 'empty' },
                [3, 0]
            );
        });

        
        expect(result.current.board).toEqual(initialBoard);
        expect(result.current.selectedPiece).toBeNull();
    });

});

describe('Chess Game Edge Cases', () => {

    it('should not crash when clicking outside board range', () => {
        const { result } = renderHook(() => useChestGameContainer());
        expect(() => {
            act(() => {
                result.current.handleCellClick(
                    { value: PIECES.EMPTY, team: 'empty' },
                    [-1, -1]
                );
            });
        }).not.toThrow();
    });
});