import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import styles from '../components/Search.module.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistInput: '',
      buttonDisabled: true,
      carregando: false,
      artistAlbums: [],
      artistSearched: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState(() => ({
      [name]: target.value,
    }),
    this.activateButton);
  }

  validateName = (input) => {
    const min = 2;
    if (input.length >= min) {
      return true;
    }
    return false;
  }

  activateButton = () => {
    const { artistInput } = this.state;
    const validate = this.validateName(artistInput);
    if (validate) {
      this.setState(() => ({ buttonDisabled: false }));
    } else {
      this.setState(() => ({ buttonDisabled: true }));
    }
  }

  requestArtist = async () => {
    const { artistInput } = this.state;
    this.setState({ carregando: true, artistSearched: artistInput });
    const searchResults = await searchAlbumsAPI(artistInput);
    this.setState({ artistInput: '', carregando: false, artistAlbums: searchResults });
  }

  render() {
    const { buttonDisabled, carregando, artistAlbums, artistSearched } = this.state;
    return (
      <div data-testid="page-search" className={ styles.searchContainer }>
        <Header />
        { carregando ? <Loading /> : (
          <form className={ styles.searchForm }>
            <h1>O que você quer ouvir hoje?</h1>
            <label htmlFor="page-search" className={ styles.formContainer }>
              <input
                type="text"
                name="artistInput"
                data-testid="search-artist-input"
                onChange={ this.handleChange }
                placeholder="Pesquise por artista, album, musica..."
              />
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ buttonDisabled }
                onClick={ this.requestArtist }
              >
                Pesquisar
              </button>
            </label>

          </form>
        )}

        { artistAlbums.length > 0 ? (
          <div className={ styles.albumsContainer }>
            <h1>{ `Resultado de álbuns de: ${artistSearched}` }</h1>
            <section className={ styles.albumsList }>
              {artistAlbums.map(
                ({ artistName, collectionId, collectionName, artworkUrl100 }) => (
                  <div key={ collectionId } className={ styles.albumBox }>
                    <img src={ artworkUrl100 } alt={ collectionName } />
                    <div>
                      <Link
                        to={ `/album/${collectionId}` }
                        data-testid={ `link-to-album-${collectionId}` }
                        className={ styles.songName }
                      >
                        {collectionName}
                      </Link>
                    </div>
                    <p>{ artistName }</p>
                  </div>),
              )}
            </section>
          </div>
        ) : <p className={ styles.noAlbumFound }>Nenhum álbum foi encontrado</p>}
      </div>
    );
  }
}

export default Search;
