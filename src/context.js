import React from 'react';

const initialState = {
    user: localStorage.getItem('user'),
    token: !!localStorage.getItem('token'),
    isAuthenticating: false,
    authError: null,
    theme: 'light'
}

const Context = React.createContext(initialState);
export default Context;