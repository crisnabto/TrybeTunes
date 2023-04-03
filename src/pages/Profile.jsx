import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import styles from '../components/Profile.module.css';

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
      <div data-testid="page-profile" className={ styles.profileContainer }>
        <Header />
        { carregando ? <Loading /> : (
          <div className={ styles.profileCard }>
            <div className={ styles.imageNameButton }>
              <div className={ styles.imageName }>
                <img data-testid="profile-image" src={ image } alt={ name } />
                <h1>{name}</h1>
              </div>
              <Link to="/profile/edit">
                <button type="button">Editar perfil</button>
              </Link>
            </div>
            <div className={ styles.emailDesc }>
              <div className={ styles.email }>
                {/* <h3>Email: </h3> */}
                <p>{email}</p>
              </div>
              <div className={ styles.description }>
                {/* <h3>Descrição: </h3> */}
                <p>{description}</p>
              </div>
            </div>
          </div>

        )}
      </div>
    );
  }
}

export default Profile;
