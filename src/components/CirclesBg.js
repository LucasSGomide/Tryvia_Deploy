import React from 'react';

class CirclesBg extends React.Component {
  render() {
    return(
      <div class='ripple-background'>
        <div class='circle xxlarge shade1' />
        <div class='circle xlarge shade2' />
        <div class='circle large shade3' />
        <div class='circle mediun shade4' />
        <div class='circle small shade5' />
      </div>
    )
  }
}

export default CirclesBg;
