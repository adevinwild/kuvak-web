import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import ThemeOptions from '../'

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
}

describe('ThemeOptions', () => {
  beforeAll(() => {
    setupTests()
  })

  it('ThemeOptions - should render correctly all the options', async () => {
    const { asFragment } = render(<ThemeOptions />)

    const select = screen.getByRole('combobox')

    const event = user.setup()
    await event.click(select)

    expect(asFragment()).toMatchSnapshot()
  })

  it("ThemeOptions - should have the default value of 'Light'", () => {
    render(<ThemeOptions />)

    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveTextContent('Light')
  })

  it('ThemeOptions - should change the theme to "Dark" when selected', async () => {
    render(<ThemeOptions />)
    const event = user.setup()

    const select = screen.getByRole('combobox')

    await event.click(select)
    expect(select).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    const firstOption = screen.getByText('Sunset')
    expect(firstOption).toBeInTheDocument()
    await event.click(firstOption)
    expect(select).toHaveTextContent('Sunset')
  })
})
