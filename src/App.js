import React, { useReducer, useContext } from 'react';
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
import Context from './context';



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
  const stateContext = useContext(Context);
  const [state, dispatch] = useReducer(reducer, stateContext)

  return (
    <React.Fragment>
      <Context.Provider value={{state, dispatch}}>
      <div className="App">
        <Grid padded style={{ padding: '10px 0', backgroundColor: '#dadada', minHeight: '100vh' }}>
          <Grid.Column style={{ maxWidth: 700, margin: '0 auto' }}>
            <Header/>
            <Switch>
              <Route exact path="/" component={AuthorsRoute} />
              <Route path="/login" component={() => <Login/>} />
              <Route path="/authors" component={AuthorsRoute} />
              <Route exact path="/books/create" component={CreateBook} />
              <Route path="/books/:id/edit" component={EditBook} />
              <Route path="/books" component={Books} />
            </Switch>
          </Grid.Column>
        </Grid>
      </div>
      </Context.Provider>
    </React.Fragment>
  );
}

export default App;
