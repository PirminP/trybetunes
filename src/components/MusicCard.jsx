import React from 'react';
import propTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { TrackName, TrackUrl } = this.props;
    return (
      <section>
        <p>{ TrackName }</p>
        <audio data-testid="audio-component" src={ TrackUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </section>
    );
  }
}

MusicCard.propTypes = {
  TrackName: propTypes.string.isRequired,
  TrackUrl: propTypes.string.isRequired,
};

export default MusicCard;
