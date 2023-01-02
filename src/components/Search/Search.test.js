import { render, screen } from '@testing-library/react';
import SearchComponent from './Search';


describe('Testing Search component', () => {
    test('renders Search component', () => {
        render(<SearchComponent />);

        screen.debug()
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
});