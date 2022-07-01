import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      inputName: '',
      buttonDisabled: true,
      carregando: false,
      changePath: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState(() => ({
      [name]: target.value,
    }),
    this.checkDisabledButton);
  }

  validateName = (input) => {
    const max = 3;
    if (input.length >= max) {
      return true;
    }
    return false;
  }

  checkDisabledButton = () => {
    const { inputName } = this.state;
    const validate = this.validateName(inputName);
    if (validate) {
      this.setState(() => ({ buttonDisabled: false }));
    } else {
      this.setState(() => ({ buttonDisabled: true }));
    }
  }

  saveInputName = async () => {
    const { inputName } = this.state;
    const obj = {
      name: inputName,
    };
    this.setState({ carregando: true });
    await createUser(obj);
    this.setState({ carregando: false, changePath: true });
  }

  render() {
    const { buttonDisabled, carregando, changePath } = this.state;
    return (
      <div data-testid="page-login">
        { carregando
          ? <Loading /> : (
            <form>
              <label htmlFor="name-input">
                <input
                  type="text"
                  name="inputName"
                  data-testid="login-name-input"
                  onChange={ this.handleChange }
                />
              </label>

              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ buttonDisabled }
                onClick={ this.saveInputName }
              >
                Entrar
              </button>
            </form>
          )}

        {changePath && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
