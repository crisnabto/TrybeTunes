import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      carregando: true,
      userObj: '',
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    // this.setState({ carregando: true });
    const userInfo = await getUser();
    this.setState({ carregando: false, userObj: userInfo });
  }

  render() {
    const { userObj, carregando } = this.state;
    const { name, description, email, image } = userObj;
    return (
      <div data-testid="page-profile">
        <Header />
        { carregando ? <Loading /> : (
          <>
            <h1>{name}</h1>
            <h3>{email}</h3>
            <p>{description}</p>
            <img data-testid="profile-image" src={ image } alt={ name } />
            <Link to="/profile/edit">
              <button type="button">Editar perfil</button>
            </Link>
          </>

        )}
      </div>
    );
  }
}

export default Profile;
