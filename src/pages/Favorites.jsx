import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      carregando: false,
      favoriteSongs: [],
      // favorite: false,
    };
  }

  componentDidMount() {
    this.getAllFavorites();
  }

  // componentDidUpdate() {
  //   this.getAllFavorites()
  // }

  // refreshComponent = () => {
  //   this.getAllFavorites();
  // }

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
            <MusicCard songs={ song } key={ index } />
          ))

        )}

      </div>
    );
  }
}

export default Favorites;
