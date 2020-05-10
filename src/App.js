import React, { useReducer, useContext } from 'react';
import './App.css';
import AuthorsRoute from './pages/Authors';
import Books from './pages/Books';
import Login from './components/Login';
import { Switch, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import CreateBook from './components/Books/Create';
import EditBook from './components/Books/Edit';
import Context from './context';
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme, GlobalStyles, Wrapper, Container } from './globalStyles'
import ButtonTheme from './components/utils/ButtonTheme';



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
    case 'SET_THEME':
      return {
        ...state, theme: action.payload
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
      <ThemeProvider theme={state.theme == 'light' ? lightTheme : darkTheme}>
        <Context.Provider value={{ state, dispatch }}>
          <ButtonTheme />
          <GlobalStyles />
          <div className="App">
            <Wrapper>
              <Container>
                <Header />
                <Switch>
                  <Route exact path="/" component={AuthorsRoute} />
                  <Route path="/login" component={() => <Login />} />
                  <Route path="/authors" component={AuthorsRoute} />
                  <Route exact path="/books/create" component={CreateBook} />
                  <Route path="/books/:id/edit" component={EditBook} />
                  <Route path="/books" component={Books} />
                </Switch>
              </Container>
            </Wrapper>
          </div>
        </Context.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
