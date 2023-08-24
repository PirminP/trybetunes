import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import styles from './AlbumCards.module.css';

class AlbumCards extends React.Component {
  render() {
    const { Id, Image, AlbumName } = this.props;
    return (
      <section className={ styles.container }>
        <div>
          <img src={ Image } alt={ AlbumName } />
          <p>{ AlbumName }</p>
        </div>
        <Link
          to={ `album/${Id}` }
          data-testid={ `link-to-album-${Id}` }
        >
          Album
        </Link>
      </section>
    );
  }
}

AlbumCards.propTypes = {
  Id: propTypes.string.isRequired,
  Image: propTypes.string.isRequired,
  AlbumName: propTypes.string.isRequired,
};

export default AlbumCards;
