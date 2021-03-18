import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTokenAPI, savePlayerData } from '../redux/actions';
import settingsImg from '../images/settings.png';
import playImg from '../images/play.png';

class LoginForm extends React.Component {
  constructor() {
    super();

    this.emailIsValid = this.emailIsValid.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: '',
      email: '',
    };
  }

  emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  handleNameChange({ target }) {
    const { value } = target;
    this.setState({
      name: value,
    });
  }

  handleEmailChange({ target }) {
    const { value } = target;
    const email = this.emailIsValid(value);
    if (email) {
      this.setState({
        email: value,
      });
    } else {
      this.setState({
        email: '',
      });
    }
  }

  handleClick() {
    const { fetchToken, saveData } = this.props;
    fetchToken();
    saveData(this.state);
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="login-container">
        <h1>TRYVIA</h1>
        <form className="login-form">
          <label htmlFor="name-input">
            <input
              data-testid="input-player-name"
              id="name-input"
              placeholder="Seu nome"
              onChange={ this.handleNameChange }
            />
          </label>
          <label htmlFor="email-input">
            <input
              data-testid="input-gravatar-email"
              id="email-input"
              placeholder="Seu email"
              onChange={ this.handleEmailChange }
            />
          </label>
          <div className="btn-login-container">
            <div className="btn-play-container">
              <Link to="/game">
                <button
                  type="button"
                  data-testid="btn-play"
                  className="btn-play"
                  disabled={ !name || !email }
                  onClick={ () => this.handleClick() }
                >
                  {!name || !email ? '' : 
                    <img
                      className="img-play"
                      src={playImg}
                    />
                    }
                </button>
              </Link>
            </div>
            <div className="btn-settings-container">
              <Link to="/settings">
                <img 
                  src={settingsImg}
                  className="img-settings"
                />
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(fetchTokenAPI()),
  saveData: (data) => dispatch(savePlayerData(data)),
});

export default connect(null, mapDispatchToProps)(LoginForm);

LoginForm.propTypes = {
  fetchToken: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
};
