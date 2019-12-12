import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter as Router } from "react-router-dom";
import { setContext } from "apollo-link-context";
import { checkToken } from './utils/storage';

const authLink = setContext((_, { headers }) => {
    const token = checkToken();
    return {
        headers: { ...headers, token: token ? `${token}` : ''}
      }
});

const httpLink = createUploadLink({
    uri: process.env.REACT_APP_URI_GRAPHQL
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

ReactDOM.render(
    <Router>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();