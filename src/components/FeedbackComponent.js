import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { resetToPlayAgain } from '../redux/actions';
import './Feedback.css'

class FeedbackComponent extends React.Component {
  constructor() {
    super();

    this.handleFeedback = this.handleFeedback.bind(this);
  }

  handleFeedback() {
    const { correctAnswers, name } = this.props;
    const three = 3;
    if (correctAnswers > three) {
      return (
      <p data-testid="feedback-text">{name}, you are awesome ! 🚀</p>
      );
    }
    if (correctAnswers === three) {
      return (
        <p data-testid="feedback-text">{name}, you did a great job ! 😄</p>
      );
    }

    if (correctAnswers < three) {
      return (
        <p data-testid="feedback-text">{name}, you can do better... 😔</p>
      );
    }
  }

  render() {
    const { name, email, score, correctAnswers, playAgain } = this.props;

    return (
      <div className="feedback-container">
        <div className="feedback-header">
          <img
            data-testid="header-profile-picture"
            // gravatar
            src={ `https://www.gravatar.com/avatar/${md5(email)}` }
            alt="gravatar-profile-pic"
          />
          <p data-testid="header-player-name">Player: {name}</p>
          <p data-testid="header-score">Score: {score}</p>
        </div>
        <div className="feedback-section">
          <p data-testid="feedback-total-score">Score: {score}</p>
          <p data-testid="feedback-total-question">Acertos: {correctAnswers}</p>
          {this.handleFeedback()}
        </div>
        <div className="feedback-buttons">
          <Link to="/">
            <button
              data-testid="btn-play-again"
              type="button"
              onClick={ playAgain }
              className="btn-feedback"
            >
              Play Again
            </button>
          </Link>
          <Link to="/ranking">
            <button
              data-testid="btn-ranking"
              type="button"
              className="btn-feedback"
            >
              To Ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  playAgain: () => dispatch(resetToPlayAgain()),
});

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.user.score,
  correctAnswers: state.game.correctAnswers,
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackComponent);

FeedbackComponent.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  playAgain: PropTypes.func.isRequired,
};
