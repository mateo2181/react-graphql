import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import AuthorComponent from './Author';

// Instantiate router context
const router = {
    history: new BrowserRouter().history,
    route: {
        location: {},
        match: {},
    },
};

const createContext = () => ({
    context: { router },
    childContextTypes: {},
});

const author = {
    id: 1,
    firstName: 'Joe',
    lastName: 'Cole',
    description: '',
    nationality: 'England',
    image: '',
    books: []
};

describe('Test Author', () => {
    it('Test props',() => {
        const {getByText, getByTestId, container } = render(<BrowserRouter><AuthorComponent author={author} /></BrowserRouter>);
        const header = getByTestId('author-header');
        expect(header.innerHTML).toBe(`${author.firstName} ${author.lastName}`);
    })
})
// const Index = TestRenderer.create(<BrowserRouter><AuthorComponent author={author} /></BrowserRouter>);
// const IndexInstance = Index.root;
// expect(IndexInstance.findAllByType(AuthorComponent)[0].findByProps({ className: 'text-lg' })).toEqual([`${author.firstName} ${author.lastName}`]);


