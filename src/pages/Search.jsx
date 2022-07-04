import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistInput: '',
      buttonDisabled: true,
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

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="page-search">
            <input
              type="text"
              name="artistInput"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
          </label>

          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ buttonDisabled }
            onClick={ this.activateButton }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
