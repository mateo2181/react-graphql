import React from 'react'
import { Switch } from 'react-router-dom'
import Authors from './All'
import AuthorDetail from './Detail'
import PrivateRoute from '../PrivateRoute'
import CreateAuthor from './Create'

const AuthorsRoute = () => (
  <Switch>
    <PrivateRoute exact path="/authors" component={Authors} />
    <PrivateRoute exact path="/authors/create" component={CreateAuthor} />
    <PrivateRoute path="/authors/:id" component={AuthorDetail} />
  </Switch>
)


export default AuthorsRoute
