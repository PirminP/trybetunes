import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

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
    };
  }

  async componentDidMount() {
    await this.listTracks();
    this.separetedArray();
  }

  async listTracks() {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({ MusicResultSearch: result });
  }

  separetedArray() {
    const { MusicResultSearch } = this.state;
    console.log(MusicResultSearch);
    const AlbumInfo = MusicResultSearch
      .filter(({ wrapperType }) => wrapperType !== 'track');
    console.log(AlbumInfo);
    this.setState({
      AlbumTracks: MusicResultSearch
        .filter(({ kind }) => kind === 'song'),
      AlbumName: AlbumInfo[0].collectionName,
      ArtistName: AlbumInfo[0].artistName,
      IsSearchReady: true,
    });
  }

  render() {
    const { IsSearchReady, AlbumTracks, AlbumName, ArtistName } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          { IsSearchReady
          && (
            <div>
              <h1 data-testid="artist-name">{ ArtistName }</h1>
              <h2 data-testid="album-name">{ AlbumName }</h2>
              {AlbumTracks
                .map(({ trackId, trackName, previewUrl }) => (<MusicCard
                  key={ trackId }
                  TrackName={ trackName }
                  TrackUrl={ previewUrl }
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
