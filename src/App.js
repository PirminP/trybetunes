import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import ProfileEdit from './pages/ProfileEdit';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <main>
        <h1>TrybeTunes</h1>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default App;
