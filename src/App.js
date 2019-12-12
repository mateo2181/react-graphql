import React, { useReducer } from 'react';
import './App.css';
import AuthorsRoute from './components/Authors';
import Login from './components/Login';
import { Switch, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Books from './components/Books';
import CreateBook from './components/Books/Create';


const initialState = {
  user: localStorage.getItem('user'),
  token: !!localStorage.getItem('token'),
  isAuthenticating: false,
  authError: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'AUTH_BEGIN':
      return {
        ...state,
        isAuthenticating: true,
      }

    case 'AUTH_SUCCESS':
      return {
        isAuthenticating: false,
        user: action.user,
        token: action.token,
        authError: null,
      }

    case 'AUTH_FAILURE':
      return {
        isAuthenticating: false,
        user: null,
        token: null,
        authError: action.error,
      }
    case 'LOGOUT':
      return {
        isAuthenticating: false,
        user: null,
        token: null,
        authError: null,
      }

    default:
      return state
  }
}

function App() {
  const [store, dispatch] = useReducer(reducer, initialState)

  return (
    <React.Fragment>
      <div className="App">
        <div className="bg-gray-200 min-h-screen px-4">
          <div className="max-w-2xl mx-auto">
            <Header store={store} dispatch={dispatch} />
            <Switch>
              <Route store={store} dispatch={dispatch} path="/" exact component={Login} />
              <Route path="/login" component={() => <Login store={store} dispatch={dispatch} />} />
              <PrivateRoute path="/authors" component={AuthorsRoute} />
              <PrivateRoute exact path="/books/create" component={CreateBook} />
              <PrivateRoute path="/books" component={Books} />
            </Switch>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
