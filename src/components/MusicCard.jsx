import React from 'react';
import PropTypes from 'prop-types';
import { AiFillHeart } from 'react-icons/ai';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import styles from './MusicCard.module.css';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
      carregando: false,
    };
  }

  componentDidMount() {
    this.getPreviousFavoriteSongs();
  }

  getPreviousFavoriteSongs = async () => {
    const { songs } = this.props;
    const savedSongs = await getFavoriteSongs();
    // se a música selecionada estiver dentre as musicas favoritadas que estão salvas no localstorage, o checkbox será marcado.
    const isFavorite = savedSongs.some((song) => song.trackName === songs.trackName);
    if (isFavorite) {
      this.setState({ favorite: true });
    }
  }

  favoriteSong = async () => {
    const { favorite } = this.state;
    const { songs, update } = this.props;
    if (favorite === false) {
      this.setState({ carregando: true });
      await addSong(songs);
      this.setState({ carregando: false, favorite: true });
    } else {
      this.setState({ carregando: true });
      await removeSong(songs);
      this.setState({ carregando: false, favorite: false });
      // atualiza as músicas favoritas recebidas pelo componente Favorites:
      update();
    }
  }

  render() {
    const { songs } = this.props;
    const { trackName, previewUrl, trackId } = songs;
    const { carregando, favorite } = this.state;
    return (
      <div className={ styles.musicCard }>
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
              onChange={ this.favoriteSong }
              checked={ favorite }
            />
            <AiFillHeart />
            {' '}
            Favorita
          </label>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.objectOf(PropTypes.any).isRequired,
  update: PropTypes.func.isRequired,
};

export default MusicCard;
