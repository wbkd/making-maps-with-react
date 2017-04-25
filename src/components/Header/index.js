import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import GlobeIcon from 'react-icons/lib/go/globe';

import './Header.styl';

class Home extends PureComponent {

  render() {
    return (
      <header className="header">
        <Link to="/" className="header__claim">
          <GlobeIcon />
          <span className="header__title">Making Maps With Reacts</span>
        </Link>
      </header>
    );
  }
}

export default Home;
