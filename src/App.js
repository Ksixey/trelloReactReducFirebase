import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ListPage from './pages/ListPage';
import AuthForm from './components/Auth/AuthForm';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import {AuthProvider} from './components/Auth/Auth'
const App =()=> {

  return (
    <AuthProvider>
      <BrowserRouter>
          <div className="container" >
              <Switch>
                <PrivateRoute path="/" exact component={ListPage} />
                <Route path="/login" exact ><AuthForm login/> </Route>
                <Route signup path="/signup" exact><AuthForm /></Route>
              </Switch>
          </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
