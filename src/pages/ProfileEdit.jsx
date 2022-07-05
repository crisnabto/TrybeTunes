import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

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
      <div data-testid="page-profile-edit">
        <Header />
        { carregando ? <Loading /> : (
          <form>
            <div>
              <label htmlFor="name">
                Nome:
                <input
                  type="text"
                  value={ name }
                  name="name"
                  data-testid="edit-input-name"
                  onChange={ this.handleChange }
                />
              </label>
            </div>

            <div>
              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  value={ email }
                  name="email"
                  data-testid="edit-input-email"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  onChange={ this.handleChange }
                />
              </label>
            </div>

            <div>
              <label htmlFor="description">
                Descrição:
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
              </label>
            </div>

            <div>
              <label htmlFor="image">
                Foto:
                <input
                  type="text"
                  value={ image }
                  data-testid="edit-input-image"
                  name="image"
                  onChange={ this.handleChange }
                />
              </label>
            </div>

            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ buttonDisabled }
              onClick={ this.submitInfo }
            >
              Salvar
            </button>
          </form>
        )}
        {changePath && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
