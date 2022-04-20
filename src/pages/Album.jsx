import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.listTracks = this.listTracks.bind(this);
    this.state = {
      MusicResultSearch: '',
      AlbumTracks: '',
      AlbumName: '',
      ArtistName: '',
      IsSearchReady: false,
      IsRecapturingFav: true,
      TheFavTracks: '',
    };
  }

  async componentDidMount() {
    await this.listTracks();
    this.separetedArray();
    this.recoveredFav();
  }

  async listTracks() {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({ MusicResultSearch: result });
  }

  separetedArray() {
    const { MusicResultSearch } = this.state;
    // console.log(MusicResultSearch);
    const AlbumInfo = MusicResultSearch
      .filter(({ wrapperType }) => wrapperType !== 'track');
    // console.log(AlbumInfo);
    this.setState({
      AlbumTracks: MusicResultSearch
        .filter(({ kind }) => kind === 'song'),
      AlbumName: AlbumInfo[0].collectionName,
      ArtistName: AlbumInfo[0].artistName,
      IsSearchReady: true,
    });
  }

  async recoveredFav() {
    this.setState({ IsRecapturingFav: true });
    const FavTrackArray = await getFavoriteSongs();
    // console.log(FavTrackArray);
    this.setState({
      IsRecapturingFav: false,
      TheFavTracks: FavTrackArray,
    });
  }

  render() {
    const {
      IsSearchReady,
      AlbumTracks,
      AlbumName,
      ArtistName,
      IsRecapturingFav,
      TheFavTracks } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-album">
          { IsSearchReady && !IsRecapturingFav
          && (
            <div>
              <h1 data-testid="artist-name">{ ArtistName }</h1>
              <h2 data-testid="album-name">{ AlbumName }</h2>
              {AlbumTracks
                .map((trackObject) => (<MusicCard
                  key={ trackObject.trackId }
                  entireObject={ trackObject }
                  TrackName={ trackObject.trackName }
                  TrackUrl={ trackObject.previewUrl }
                  TrackId={ trackObject.trackId }
                  TheFav={ TheFavTracks }
                />
                )) }
            </div>
          )}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};

export default Album;
