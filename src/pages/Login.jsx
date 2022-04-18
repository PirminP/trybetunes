import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoadingPage from './LoadingPage';

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
      <div data-testid="page-login">
        <input
          type="text"
          value={ NameInput }
          data-testid="login-name-input"
          onChange={ this.enableButton }
        />
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
      </div>
    );
  }
}

export default Login;
