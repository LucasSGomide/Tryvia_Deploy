import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
// import CirclesBg from './components/CirclesBg';
import DynamicBg from './components/DynamicBg';
import './App.css';
import './Dynamic.css';
// import './Circles.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/" component={ Login } />
      </Switch>
      <DynamicBg />
      </div>
    );
  }
}
