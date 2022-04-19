import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingPage from '../pages/LoadingPage';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      getName: '',
      IsLoading: true,
    };
  }

  async componentDidMount() {
    const getUserInput = await getUser();
    this.updateUserName(getUserInput.name);
  }

  updateUserName(string) {
    this.setState({
      getName: string,
      IsLoading: false,
    });
  }

  render() {
    const { getName, IsLoading } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
        { IsLoading ? <LoadingPage /> : (
          <p data-testid="header-user-name">
            Hoi,
            { getName }
          </p>)}
      </header>
    );
  }
}

export default Header;
