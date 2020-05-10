import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Authors from '../../components/Authors/All'
import AuthorDetail from '../../components/Authors/Detail'
import PrivateRoute from '../../components/PrivateRoute'
import CreateAuthor from '../../components/Authors/Create'
import EditAuthor from '../../components/Authors/Edit'

const AuthorsRoute = () => (
  <Switch>
    <Route exact path="/" component={Authors} />
    <Route exact path="/authors" component={Authors} />
    <Route exact path="/authors/create" component={CreateAuthor} />
    <Route path="/authors/:id/edit" component={EditAuthor} />
    <Route path="/authors/:id" component={AuthorDetail} />
  </Switch>
)


export default AuthorsRoute
