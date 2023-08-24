import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoadingPage from './LoadingPage';
import styles from './Login.module.css';

class Login extends React.Component {
  constructor() {
    super();
    this.enableButton = this.enableButton.bind(this);
    this.uploadName = this.uploadName.bind(this);

    this.state = {
      NameInput: '',
      IsButtonDisabled: true,
      IsLoading: false,
      IsFunctionReady: false,
    };
  }

  enableButton({ target }) {
    const minTextCaracter = 3;
    const { value } = target;
    this.setState({
      NameInput: value,
      IsButtonDisabled: (value.length < minTextCaracter),
    });
  }

  async uploadName() {
    this.setState({ IsLoading: true, IsFunctionReady: false });
    const { NameInput } = this.state;
    await createUser({ name: NameInput });
    this.setState({
      IsLoading: false,
      IsFunctionReady: true,
    });
  }

  render() {
    const { NameInput, IsButtonDisabled, IsLoading, IsFunctionReady } = this.state;
    return (
      <section className={ styles.container }>
        <section>
          <form data-testid="page-login">
            <label htmlFor="login-name-input">
              <input
                type="text"
                value={ NameInput }
                data-testid="login-name-input"
                placeholder="Username"
                onChange={ this.enableButton }
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ IsButtonDisabled }
              onClick={ this.uploadName }
            >
              Entrar
            </button>
            { IsLoading && <LoadingPage /> }
            { IsFunctionReady && <Redirect to="/search" /> }
          </form>
        </section>

      </section>

    );
  }
}

export default Login;
