import { render, screen } from '@testing-library/react'
import PaddingOption from '.'
import userEvent from '@testing-library/user-event'

function setupTests() {
  class MockPointerEvent extends Event {
    button: number
    ctrlKey: boolean
    pointerType: string

    constructor(type: string, props: PointerEventInit) {
      super(type, props)
      this.button = props.button || 0
      this.ctrlKey = props.ctrlKey || false
      this.pointerType = props.pointerType || 'mouse'
    }
  }

  window.PointerEvent = MockPointerEvent as unknown as typeof PointerEvent
  window.HTMLElement.prototype.scrollIntoView = jest.fn()
  window.HTMLElement.prototype.releasePointerCapture = jest.fn()
  window.HTMLElement.prototype.hasPointerCapture = jest.fn()
  window.HTMLElement.prototype.setPointerCapture = jest.fn()
}

describe('PaddingOption', () => {
  beforeAll(() => {
    setupTests()
  })

  test('PaddingOption - it render correctly', async () => {
    render(<PaddingOption />)
    const slider = screen.getByRole('slider')

    expect(slider).toBeInTheDocument()
  })

  test('PaddingOption - it should have the default value of 8', () => {
    render(<PaddingOption />)
    const slider = screen.getByRole('slider')

    expect(slider).toHaveAttribute('aria-valuenow', '8')
  })

  test('PaddingOption - it should update the roundness value', async () => {
    render(<PaddingOption />)
    const slider = screen.getByRole('slider')
    const status = screen.getByRole('status')

    await userEvent.click(slider)
    await userEvent.keyboard('{arrowright>5}')

    expect(slider).toHaveAttribute('aria-valuenow', '28')
    expect(status).toHaveTextContent('28px')
  })

  test('PaddingOption - it should have a min value of "0"', () => {
    render(<PaddingOption />)
    const slider = screen.getByRole('slider')

    expect(slider).toHaveAttribute('aria-valuemin', '0')
  })

  test('PaddingOption - it should have a max value of "96"', () => {
    render(<PaddingOption />)
    const slider = screen.getByRole('slider')

    expect(slider).toHaveAttribute('aria-valuemax', '96')
  })
})
