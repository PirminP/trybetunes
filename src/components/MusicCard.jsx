import React from 'react';
import propTypes from 'prop-types';
import LoadingPage from '../pages/LoadingPage';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.trackToFavorites = this.trackToFavorites.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.state = {
      IsSendingTrack: false,
      CheckboxChecked: false,
    };
  }

  componentDidMount() {
    this.IsTrackFav();
  }

  handleCheckbox({ target }) {
    const { entireObject } = this.props;
    const value = target.checked;
    this.setState({
      CheckboxChecked: value,
    });
    if (value) {
      this.trackToFavorites(entireObject);
    }
  }

  IsTrackFav() {
    const { TheFav, TrackId } = this.props;
    const isFav = TheFav.some((FavTrack) => FavTrack.trackId === TrackId);
    // console.log(isFav);
    this.setState({
      CheckboxChecked: isFav,
    });
  }

  async trackToFavorites(SongObject) {
    this.setState({ IsSendingTrack: true });
    await addSong(SongObject);
    this.setState({ IsSendingTrack: false });
  }

  render() {
    const { TrackName, TrackUrl, TrackId } = this.props;
    const { IsSendingTrack, CheckboxChecked } = this.state;

    return (
      IsSendingTrack ? <LoadingPage /> : (
        <section>
          <p>{ TrackName }</p>
          <audio data-testid="audio-component" src={ TrackUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${TrackId}` }
            checked={ CheckboxChecked }
            onChange={ this.handleCheckbox }
          />
          Favorite
        </section>)
    );
  }
}

MusicCard.propTypes = {
  TrackName: propTypes.string.isRequired,
  TrackUrl: propTypes.string.isRequired,
  TrackId: propTypes.number.isRequired,
  entireObject: propTypes.shape().isRequired,
  TheFav: propTypes.arrayOf(Object).isRequired,
};

export default MusicCard;
