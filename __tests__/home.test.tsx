import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Home from '@/pages/index'

describe('Home', () => {
  it('renders link to about page', () => {
    render(<Home />)

    const homeTitle = screen.getByRole('heading', {
      name: /home page/i
    })

    const aboutLink = screen.getByRole('link', {
      name: /go to the about page/i,
    })

    expect(homeTitle).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
  })

  it('submits the form with jest value', async () => {
    render(<Home />)

    const input = screen.getByTestId('testing-input')
    const button = screen.getByTestId('testing-button')
    const p = screen.getByTestId('testing-p')

    fireEvent.change(input,  { target: { value: 'from-jest' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(p).toHaveTextContent(/tested by jest/i);
    });
  })
})

it('renders homepage unchanged', () => {
  const { container } = render(<Home />)
  expect(container).toMatchSnapshot()
})
