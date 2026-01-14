import ChestGameContainer from '@/modules/ChestGame/container/ChestGameContainer';
import '@testing-library/jest-dom'
import {render,screen,fireEvent, waitFor} from '@testing-library/react'
 
describe('ChestGameContainer', () => {

  it('Create  8x8 Board ', () => {
    const component = render(<ChestGameContainer/>);
     const col = component.getAllByTestId(/^row-\d+-col\d+$/);
     expect(col).toHaveLength(64)
  })

  it("Test that are 32 white boxes and 32 black boxes",()=>{
        const component = render(<ChestGameContainer/>);
        const col = component.getAllByTestId(/^row-\d+-col\d+$/);
        const darkCells = col.filter(box => 
            box.classList.contains('bg-amber-800')
        );
        expect(darkCells).toHaveLength(32)
    })

    it('should apply correct CSS classes for possible moves', async () => {
        render(<ChestGameContainer/>);
        
        fireEvent.click(screen.getByTestId('row-6-col0'));
        
        await waitFor(() => {
            const possibleMoveCell = screen.getByTestId('row-5-col0');
            expect(possibleMoveCell).toHaveClass('bg-green-500/50');
        });
    });


    it('should show correct piece colors', () => {
        render(<ChestGameContainer/>);
        
        const whitePawn = screen.getByTestId('row-6-col0');
        expect(whitePawn).toHaveClass('text-white');
        const blackPawn = screen.getByTestId('row-1-col0');
        expect(blackPawn).toHaveClass('text-black');
    });

    it('should alternate board colors correctly', () => {
        render(<ChestGameContainer />);
        const cell00 = screen.getByTestId('row-0-col0');
        expect(cell00).toHaveClass('bg-amber-800');
        const cell01 = screen.getByTestId('row-0-col1');
        expect(cell01).toHaveClass('bg-amber-200');
        const cell10 = screen.getByTestId('row-1-col0');
        expect(cell10).toHaveClass('bg-amber-200');
        const darkCells = screen.getAllByTestId(/^row-\d+-col\d+$/).filter(cell => 
            cell.classList.contains('bg-amber-800')
        );
        expect(darkCells).toHaveLength(32);
    });

})