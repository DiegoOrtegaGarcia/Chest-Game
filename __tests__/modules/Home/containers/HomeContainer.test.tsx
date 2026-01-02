import HomeContainer from '@/modules/Home/container/HomeContainer';
import '@testing-library/jest-dom'
import {render} from '@testing-library/react'
 
describe('Home', () => {
  it('renders a heading', () => {
     const component = render(<HomeContainer/>);
 
    component.getAllByText("Chest Game")
  })

  it("render a button",()=>{
    const component = render(<HomeContainer/>);

    const link = component.getByText('Play a Game');

    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/ChestGame');
  })
})