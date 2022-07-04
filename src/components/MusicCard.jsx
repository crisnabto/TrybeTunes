import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
      carregando: false,
    };
  }

  favoriteSong = async () => {
    const { favorite } = this.state;
    if (favorite === false) {
      const { songs } = this.props;
      this.setState({ carregando: true });
      await addSong(songs);
      this.setState({ carregando: false, favorite: true });
    } else {
      const { songs } = this.props;
      this.setState({ carregando: true });
      await removeSong(songs);
      this.setState({ carregando: false, favorite: false });
    }
  }

  render() {
    const { songs } = this.props;
    const { trackName, previewUrl, trackId } = songs;
    const { carregando, favorite } = this.state;
    // console.log(trackName);
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        {carregando ? <Loading /> : (
          <label htmlFor={ trackId }>
            <input
              type="checkbox"
              id={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
              onClick={ this.favoriteSong }
              checked={ favorite }
            />
            Favorita
          </label>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MusicCard;
