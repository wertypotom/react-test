import React from 'react';
import renderer from 'react-test-renderer';
import App, { Counter, dataReducer } from './App';

const list = ['a', 'b', 'c']

describe('Counter', () => {
    test('snapshot tests', () => {
        const component = renderer.create(<Counter counter={1} />)
        let tree = component.toJSON()

        expect(tree).toMatchSnapshot()

    })
})

describe('App', () => {
    test('snapshot tests', () => {
        const component = renderer.create(<App />)
        let tree = component.toJSON()

        expect(tree).toMatchSnapshot()
    })

    describe('Reducer', () => {
        test('should set a list', () => {
            const state = { list: [], error: null }
            const newState = dataReducer(state, {
                type: 'SET_LIST',
                list
            })

            expect(newState).toEqual({ list, error: null })
        })

        test('should reset the error', () => {
            const state = { list: [], error: true }
            const newState = dataReducer(state, {
                type: 'SET_LIST',
                list
            })

            expect(newState).toEqual({ list, error: null })
        })

        test('should set the error', () => {
            const state = { list: list, error: true }
            const newState = dataReducer(state, {
                type: 'SET_ERROR',
            })

            expect(newState.error).toBe(true)
            expect(newState).toEqual({ list: [], error: true })
        })

    })
})