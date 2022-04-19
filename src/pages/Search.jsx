import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.enableButton = this.enableButton.bind(this);

    this.state = {
      BandNameSearch: '',
      IsButtonDisabled: true,
    };
  }

  enableButton({ target }) {
    const minTextCaracter = 2;
    const { value } = target;
    this.setState({
      BandNameSearch: value,
      IsButtonDisabled: (value.length < minTextCaracter),
    });
  }

  render() {
    const { BandNameSearch, IsButtonDisabled } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <input
            type="text"
            value={ BandNameSearch }
            data-testid="search-artist-input"
            onChange={ this.enableButton }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ IsButtonDisabled }
          >
            Pesquisar
          </button>
        </div>
      </>
    );
  }
}

export default Search;
