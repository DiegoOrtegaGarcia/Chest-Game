import HomeContainer from '@/modules/Home/container/HomeContainer';
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
 
describe('Home', () => {
  it('renders a heading', () => {
     const component = render(<HomeContainer/>);
 
    component.getAllByText("Chest Game")
  })
})