import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      carregando: false,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    this.setState({ carregando: true });
    const { name } = await getUser();
    this.setState({ userName: name, carregando: false });
  }

  render() {
    const { userName, carregando } = this.state;
    return (
      <header data-testid="header-component">
        { carregando ? <Loading /> : (
          <p data-testid="header-user-name">{userName}</p>
        )}

        <Link to="/search" data-testid="link-to-search" />
        <Link to="/favorites" data-testid="link-to-favorites" />
        <Link to="/profile" data-testid="link-to-profile" />
      </header>
    );
  }
}

export default Header;
