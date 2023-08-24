import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingPage from './LoadingPage';
import AlbumDeck from '../components/AlbumDeck';
import styles from './Search.module.css';

class Search extends React.Component {
  constructor() {
    super();
    this.enableButton = this.enableButton.bind(this);
    this.searchBand = this.searchBand.bind(this);

    this.state = {
      BandNameSearch: '',
      IsButtonDisabled: true,
      IsSearching: false,
      ResultSearch: '',
      LastBandSearch: '',
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

  async searchBand() {
    const { BandNameSearch } = this.state;
    const bandtoSearch = BandNameSearch;
    this.setState({ BandNameSearch: '', IsSearching: true });
    const bandResult = await searchAlbumsAPI(bandtoSearch);
    this.setState({
      ResultSearch: bandResult,
      IsSearching: false,
      LastBandSearch: bandtoSearch,
    });
  }

  render() {
    const {
      BandNameSearch,
      IsButtonDisabled,
      ResultSearch,
      IsSearching,
      LastBandSearch,
    } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <main className={ styles.container }>
            <form>
              <input
                type="text"
                value={ BandNameSearch }
                placeholder="Please insert an artist"
                data-testid="search-artist-input"
                onChange={ this.enableButton }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ IsButtonDisabled }
                onClick={ this.searchBand }
              >
                Pesquisar
              </button>
            </form>
          </main>
        </div>
        { IsSearching ? <LoadingPage />
          : <AlbumDeck albumArray={ ResultSearch } artistName={ LastBandSearch } />}
      </>
    );
  }
}

export default Search;
