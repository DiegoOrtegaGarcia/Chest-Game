import ChestGameContainer from '@/modules/ChestGame/container/ChestGameContainer';
import '@testing-library/jest-dom'
import {render} from '@testing-library/react'
 
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
})