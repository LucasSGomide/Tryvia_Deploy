import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { resetToPlayAgain } from '../redux/actions';
import '../ranking.css';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.addRankingPlayers();
    this.getLocalStorageRanking();
  }

  getLocalStorageRanking() {
    const storageRanking = JSON.parse(localStorage.getItem('ranking'));
    storageRanking.sort((a, b) => b.score - a.score);
    this.setState({
      ranking: [...storageRanking],
    });
  }

  addRankingPlayers() {
    const { name, email, score, correctAnswers } = this.props;
    const img = `https://www.gravatar.com/avatar/${md5(email)}`;
    const storageRanking = JSON.parse(localStorage.getItem('ranking'));
    const newPlayer = { name, score, correctAnswers, img };
    if (storageRanking) {
      const saveRanking = [...storageRanking, newPlayer];
      localStorage.setItem('ranking', JSON.stringify(saveRanking));
    }
    if (!storageRanking && name !== '') {
      localStorage.setItem('ranking', JSON.stringify([newPlayer]));
    }
  }

  render() {
    const { ranking } = this.state;
    const { playAgain } = this.props;
    return (
      <div className="ranking-container">
        <h2 data-testid="ranking-title">Ranking</h2>
          <div className="rank-header">
            <div className="rank-header-row">PLAYER</div>
            <div className="rank-header-row">SCORE</div>
            <div className="rank-header-row">CORRECT ANSWERS</div>
            <div className="rank-header-row"></div>
          </div>
          <div className="ranking-list">
          {ranking.map((player, index) => (
            <div className="rank" key={ `div${index}` }>
              <div className="rank-row">
                <span
                  key={ `name${index}` }
                  data-testid={ `player-name-${index}` }
                >
                  { player.name }
                </span>
              </div>
              <div className="rank-row">
                <span
                  key={ `score${index}` }
                  data-testid={ `player-score-${index}` }
                >
                  { player.score }
                </span>
              </div>
              <div className="rank-row">
                <span
                  key={ `answer${index}` }
                >
                  {player.correctAnswers}
                </span>
              </div>
              <div className="rank-row">
                <img src={ player.img } alt="Palyer Avatar" />
              </div>
            </div>)) }
        </div>
        <div className="rank-btn-container">
          <Link to="/">
            <button
              type="button"
              data-testid="btn-go-home"
              onClick={ playAgain }
            >
              Play Again
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

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  playAgain: PropTypes.func.isRequired,
};
