import React from 'react';
import { Link } from 'react-router-dom';
import { BsHeadphones } from 'react-icons/bs';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import styles from './Header.module.css';

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
      <header data-testid="header-component" className={ styles.headerContainer }>
        { carregando ? <Loading /> : (
          <div className={ styles.userInfo }>
            <p className={ styles.trybetunes }>
              <BsHeadphones />
              TrybeTunes
            </p>
            <div className={ styles.menuButtons }>
              <Link to="/search" data-testid="link-to-search" id="button">
                Pesquisar
              </Link>
              <Link to="/favorites" data-testid="link-to-favorites" id="button">
                Favoritas
              </Link>
              <Link to="/profile" data-testid="link-to-profile" id="button">
                Perfil
              </Link>
            </div>
            <p
              className={ styles.userName }
              data-testid="header-user-name"
            >
              {/* Olá,
              {' '} */}
              {userName}
              {/* ! */}
            </p>
          </div>
        )}

      </header>
    );
  }
}

export default Header;
