import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      // songID: '',
      allSongs: [],
      getInfo: '',
    };
  }

  componentDidMount() {
    this.getSongs();
  }

  getSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const answer = await getMusics(id);
    // console.log(answer)
    // remover o primeiro objeto pq ele não retorna uma música:
    const songs = answer.slice(1);
    this.setState({ allSongs: songs, getInfo: answer[0] });
    // console.log(songs)
  }

  render() {
    const { allSongs, getInfo } = this.state;
    // const { artistName } = allSongs;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <img src={ getInfo.artworkUrl100 } alt={ getInfo.collectionId } />
          <h3 data-testid="album-name">{getInfo.collectionName}</h3>
          <p data-testid="artist-name">{getInfo.artistName}</p>
          {allSongs.map((song, index) => (
            // console.log(song)
            <MusicCard songs={ song } key={ index } />
          ))}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
