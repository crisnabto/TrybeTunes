import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import styles from '../components/ProfileEdit.module.css';

class ProfileEdit extends React.Component {
  mounted = false;

  constructor(props) {
    super(props);

    this.state = {
      carregando: false,
      name: '',
      email: '',
      description: '',
      image: '',
      buttonDisabled: true,
      changePath: false,
    };
  }

  async componentDidMount() {
    this.mounted = true;
    const info = await this.getUserInfo();
    this.setState({
      name: info.name,
      email: info.email,
      description: info.description,
      image: info.image,
    });
    this.checkDisabledButton();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getUserInfo = async () => {
    this.setState({ carregando: true });
    const info = await getUser();
    this.setState({ carregando: false });
    return info;
  }

  handleChange = ({ target }) => {
    const id = target.name;
    this.setState(() => ({
      [id]: target.value,
    }),
    this.checkDisabledButton);
  }

  validate = (name, description, image) => {
    const min = 1;
    if (name.length >= min && description.length >= min && image.length >= min) {
      return true;
    }
    return false;
  }

  validateEmailInput = (email) => {
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (reg.test(email)) {
      return true;
    }
    return false;
  }

  checkDisabledButton = () => {
    const { name, email, description, image } = this.state;
    const validateInfo = this.validate(name, description, image);
    const validateEmail = this.validateEmailInput(email);
    if (validateInfo && validateEmail) {
      this.setState(() => ({ buttonDisabled: false }));
    } else {
      this.setState(() => ({ buttonDisabled: true }));
    }
  }

  submitInfo = async () => {
    const { name, email, image, description } = this.state;
    const obj = {
      name,
      email,
      image,
      description,
    };
    this.setState({ carregando: true });
    await updateUser(obj);
    if (this.mounted) {
      this.setState({ carregando: false, changePath: true, buttonDisabled: false });
    }
  }

  render() {
    const { carregando, name, email,
      description, image, buttonDisabled, changePath } = this.state;
    return (
      <div data-testid="page-profile-edit" className={ styles.editProfileContainer }>
        <Header />
        { carregando ? <Loading /> : (
          <form className={ styles.editFormContainer }>
            <div className={ styles.editForm }>
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                value={ name }
                id="name"
                name="name"
                data-testid="edit-input-name"
                onChange={ this.handleChange }
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                value={ email }
                name="email"
                id="email"
                data-testid="edit-input-email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                onChange={ this.handleChange }
              />

              <label htmlFor="description">Descrição:</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                data-testid="edit-input-description"
                value={ description }
                onChange={ this.handleChange }
              >
                {description}
              </textarea>

              <label htmlFor="image">Foto:</label>
              <input
                type="text"
                value={ image }
                data-testid="edit-input-image"
                name="image"
                onChange={ this.handleChange }
              />

              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ buttonDisabled }
                onClick={ this.submitInfo }
              >
                Salvar
              </button>
            </div>

          </form>
        )}
        {changePath && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
