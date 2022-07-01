import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name-input">
            <input
              type="text"
              data-testid="login-name-input"
            />
          </label>

          <button
            type="button"
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
