import React, { Component, PropTypes } from 'react';
// Without Relay:
// import Footer from './Footer';
import FooterRelay from '../relay/FooterRelay';
import CardsRelay from '../relay/CardsRelay';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: 'home'
    };
  }

  render() {
    const { close, state } = this.props;
    return (
      <div>
        { this.state.screen === 'home' ?
        <div>
          <h1>POLITI</h1>
          <h2>quem?</h2>
          <div className="summary">
            <div id="line"></div>
            <p>A plataforma para ver as relações dos candidatos do Brasil para as eleições.</p>
          </div>
          <CardsRelay {...this.props} />
        </div>
        : null }
      </div>
    );
  }
}

export default Home;
