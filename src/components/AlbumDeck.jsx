import React from 'react';
import propTypes from 'prop-types';
import AlbumCards from './AlbumCards';
import styles from './AlbumDeck.module.css';

class AlbumDeck extends React.Component {
  render() {
    const { albumArray, artistName } = this.props;
    return (
      albumArray.length < 1
        ? <div>Nenhum álbum foi encontrado</div> : (
          <section className={ styles.container }>
            <p>
              Resultado de álbuns de:
              {' '}
              { artistName }
            </p>
            <div>
              {albumArray
                .map(({ collectionId, artworkUrl100, collectionName }) => (
                  <AlbumCards
                    key={ collectionId }
                    Id={ collectionId }
                    Image={ artworkUrl100 }
                    AlbumName={ collectionName }
                  />
                ))}
            </div>

          </section>
        )
    );
  }
}

AlbumDeck.propTypes = {
  albumArray: propTypes.arrayOf(Object).isRequired,
  artistName: propTypes.string.isRequired,
};

export default AlbumDeck;
