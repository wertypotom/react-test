import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Stories from './Stories';

jest.mock('axios')

const stories = [
    { objectID: '1', title: 'Hello' },
    { objectID: '2', title: 'React' },
];

describe('Testing stories component', () => {
    test('Stories Async behaviour', async () => {


        axios.get.mockImplementationOnce(() => {
            return Promise.resolve({ data: { hits: stories } })
        })

        render(<Stories />)
        expect(screen.getByRole('listbox'))
            .not
            .toContainElement(screen.queryByRole('item'))

        await userEvent.click(screen.getByRole('button'))

        const items = await screen.findAllByRole('listitem')
        expect(items).toHaveLength(2)
    })

    test('make async request and gets rejected', async () => {
        axios.get.mockImplementationOnce(() => {
            return Promise.reject(new Error())
        })

        render(<Stories />)

        await userEvent.click(screen.getByRole('button'))

        const errorMsg = await screen.findByText(/Something went wrong/)

        expect(errorMsg).toBeInTheDocument()
    })

    test('async implementation wuth waitFor', async () => {
        const promise = Promise.resolve({ data: { hits: stories } })

        axios.get.mockImplementationOnce(() => promise)

        render(<Stories />)

        await userEvent.click(screen.getByRole('button'))

        waitFor(() => promise);

        expect(screen.getAllByRole('listitem')).toHaveLength(2);
    })
})
