import { render, screen } from '@testing-library/react'
import ScaleOption from './'
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

describe('ScaleOption', () => {
  beforeAll(() => {
    setupTests()
  })

  test('ScaleOption - it render correctly', async () => {
    render(<ScaleOption />)
    const slider = screen.getByRole('slider')

    expect(slider).toBeInTheDocument()
  })

  test('ScaleOption - it should have the default value of 1', () => {
    render(<ScaleOption />)
    const slider = screen.getByRole('slider')

    expect(slider).toHaveAttribute('aria-valuenow', '1')
  })

  test('ScaleOption - it should change the scale value when update', async () => {
    render(<ScaleOption />)
    const slider = screen.getByRole('slider')
    const status = screen.getByRole('status')

    await userEvent.click(slider)
    await userEvent.keyboard('{arrowright}')

    expect(slider).toHaveAttribute('aria-valuenow', '1.1')
    expect(status).toHaveTextContent('x1.1')
  })

  test('ScaleOption - it should change have a min value of "0.2"', () => {
    render(<ScaleOption />)
    const slider = screen.getByRole('slider')

    expect(slider).toHaveAttribute('aria-valuemin', '0.2')
  })

  test('ScaleOption - it should change have a max value of "4"', () => {
    render(<ScaleOption />)
    const slider = screen.getByRole('slider')

    expect(slider).toHaveAttribute('aria-valuemax', '4')
  })
})
