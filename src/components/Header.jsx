import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingPage from '../pages/LoadingPage';
import styles from './Header.module.css';

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
      <header data-testid="header-component" className={ styles.container }>
        <nav>
          <ul>
            <li><Link to="/search" data-testid="link-to-search">Search</Link></li>
            <li><Link to="/favorites" data-testid="link-to-favorites">Favorite</Link></li>
            <li><Link to="/profile" data-testid="link-to-profile">Profile</Link></li>
          </ul>
        </nav>
        <div>
          { IsLoading ? <LoadingPage /> : (
            <p data-testid="header-user-name">
              Hoi,
              { getName }
            </p>)}
        </div>
      </header>
    );
  }
}

export default Header;
