import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import { AuthContext } from './contexts/auth';
import Homepage from './views/Homepage/Homepage';
import Create from './views/Create/Create';
import Edit from './views/Edit/Edit';
import SignIn from './views/SignIn/SignIn';
import Profile from './views/Profile/Profile';
import PostDetail from './views/PostDetail/PostDetail';

const App = () => {
  const { currentUser } = useContext(AuthContext);

  let routes;

  if (currentUser) {
    routes = (
      <>
        <Route path='/create' component={Create} />
        <Route path='/profile' component={Profile} />
        <Route exact path='/posts/:id' component={PostDetail} />
        <Route path='/posts/:id/edit' component={Edit} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path='/signin' component={SignIn} />
        <Route path='/posts/:id' component={PostDetail} />
      </>
    );
  }

  return (
    <Switch>
      <Route exact path='/' component={Homepage} />
      {routes}
      <Redirect to='/' />
    </Switch>
  );
};

export default App;
