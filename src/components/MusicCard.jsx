import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

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
    // console.log(isFavorite)
    if (isFavorite) {
      this.setState({ favorite: true });
    }
  }

  favoriteSong = async () => {
    const { favorite } = this.state;
    const { songs } = this.props;
    if (favorite === false) {
      this.setState({ carregando: true });
      await addSong(songs);
      this.setState({ carregando: false, favorite: true });
    } else {
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
              onChange={ this.favoriteSong }
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
