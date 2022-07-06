import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  mounted = false;

  constructor() {
    super();

    this.state = {
      carregando: false,
      favoriteSongs: [],
      // favorite: false,
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.getAllFavorites();
    this.mounted = false;
  }

  async componentDidUpdate(event) {
    if (this.mounted) {
      this.getAllFavorites();
      console.log('passou aqui');
      await removeSong(event.target);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getAllFavorites = async () => {
    this.setState({ carregando: true });
    const allFavoriteSongs = await getFavoriteSongs();
    // this.setState({favoriteSongs: allFavoriteSongs})
    this.setState({ carregando: false, favoriteSongs: allFavoriteSongs });
  }

  render() {
    const { carregando, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { carregando ? <Loading /> : (

          favoriteSongs.map((song, index) => (
            <MusicCard songs={ song } key={ index } update={ this.getAllFavorites } />
          ))

        )}

      </div>
    );
  }
}

export default Favorites;
