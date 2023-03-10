import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import SearchComponent, { Search } from './Search';


describe('Testing Search component', () => {
    test('renders Search component', () => {
        render(<SearchComponent />);

        // screen.debug()
    });

    test('gets Search component', () => {
        render(<SearchComponent />);

        const element = screen.getByText('Search:')
        expect(element).toBeInTheDocument()

        const elementByRole = screen.getByRole('textbox')
        expect(elementByRole).toBeInTheDocument()

        const elementByPlaceholder = screen.getByPlaceholderText('search for something')
        expect(elementByPlaceholder).toBeInTheDocument()
    })

    test('check if element no exist', () => {
        render(<SearchComponent />)

        const element = screen.queryByText('some dumb text')
        expect(element).toBeNull()
    })

    test('elements rederred asynchronously', async () => {
        render(<SearchComponent />)

        const currentElement = screen.queryByText('Signed in as')
        expect(currentElement).toBeNull()

        const asyncElement = await screen.findByText(/Signed in as/)
        expect(asyncElement).toBeInTheDocument()
    })


    test('get list of elements', () => {
        render(<SearchComponent />)

        const listElements = screen.getAllByRole('list-item')
        listElements.forEach(element => {
            expect(element).toBeInTheDocument()
        })
    })

    test('test input field fire event', async () => {
        render(<SearchComponent />)

        // wait for the user to resolve
        await screen.findByText(/Signed in as/)

        const element = screen.getByRole('textbox')

        expect(screen.queryByText(/Javascript/)).toBeNull()

        fireEvent.change(element, {
            target: {
                value: 'Javascript'
            }
        })

        // expect(screen.getByText(/Javascript/)).toBeInTheDocument()

        waitFor(() => {
            expect(screen.getByText(/Javascript/)).toBeInTheDocument()
        })
    })

    test('test input field user event', async () => {
        render(<SearchComponent />)

        const element = screen.getByRole('textbox')
        await screen.findByText(/Signed in as/);

        expect(screen.queryByText(/Javascript/)).toBeNull()

        await userEvent.type(element, 'Javascript')

        expect(screen.getByText(/Javascript/)).toBeInTheDocument()
    })


    test('testing callback handling', async () => {
        const onChange = jest.fn()

        render(
            <Search value={''} onChange={onChange}>
                Search:
            </Search>
        )

        const element = screen.getByRole('textbox')

        // fireEvent.change(element, {
        //     target: {
        //         value: 'JS'
        //     }
        // })
        // expect(onChange).toHaveBeenCalledTimes(1)

        await userEvent.type(element, 'JS is good')
        expect(onChange).toHaveBeenCalledTimes(10)
    })
});
