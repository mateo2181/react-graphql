import React from 'react';
import IndexAuthorComponent from './index';
import { waitForElement, screen, findByText } from '@testing-library/dom';
import { render, act, fireEvent } from '@testing-library/react';
import { MockedProvider } from "@apollo/react-testing";
import mocks from '../../../test/mocks';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'
import { BrowserRouter } from 'react-router-dom';

const httpLink = createUploadLink({
    uri: ''
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({})
});

async function wait(ms = 0) {
    await act(() => {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    });
};

describe('Test Author', () => {
    it('Test props',async () => {
        const {findByText, getByTestId, container } = render(
            <ApolloProvider client={client}>
                <MockedProvider mocks={mocks} addTypename={false}>
                <BrowserRouter>
                    <IndexAuthorComponent />
                    </BrowserRouter>
                </MockedProvider>
            </ApolloProvider>
        );
        await wait(10);
        const items = await getByTestId('author-children');
        expect(items).toBeInTheDocument();
        // console.log(container);
    });
});

// const Index = TestRenderer.create(<IndexComponent />);
// const IndexInstance = Index.root;
// expect(IndexInstance.findAllByProps({className: 'ddd'})).toEqual(0);


