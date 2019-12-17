import React, { useReducer } from 'react';
import './App.css';
import AuthorsRoute from './components/Authors';
import Login from './components/Login';
import { Switch, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Books from './components/Books';
import CreateBook from './components/Books/Create';
import { Responsive, Segment, Grid } from 'semantic-ui-react'
import EditBook from './components/Books/Edit';

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
        <Grid padded style={{ padding: '10px 0', backgroundColor: '#dadada', minHeight: '100vh' }}>
          <Grid.Column style={{ maxWidth: 700, margin: '0 auto' }}>
            <Header store={store} dispatch={dispatch} />
            <Switch>
              <Route store={store} dispatch={dispatch} path="/" exact component={() => <Login store={store} dispatch={dispatch} />} />
              <Route path="/login" component={() => <Login store={store} dispatch={dispatch} />} />
              <Route path="/authors" component={AuthorsRoute} />
              <Route exact path="/books/create" component={CreateBook} />
              <Route path="/books/:id/edit" component={EditBook} />
              <Route path="/books" component={Books} />
            </Switch>
          </Grid.Column>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default App;
