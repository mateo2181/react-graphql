import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Authors from './All'
import AuthorDetail from './Detail'
import PrivateRoute from '../PrivateRoute'
import CreateAuthor from './Create'

const AuthorsRoute = () => (
  <Switch>
    <Route exact path="/authors" component={Authors} />
    <Route exact path="/authors/create" component={CreateAuthor} />
    <Route path="/authors/:id" component={AuthorDetail} />
  </Switch>
)


export default AuthorsRoute
