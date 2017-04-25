import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { slugify } from '../../helper/utils';

import './Home.styl';

const libraries = ['React Leaflet', 'Pigeon Maps'];

class Home extends PureComponent {

  render() {
    return (
      <div className="home">
        <ul className="menu">
          {libraries.map((lib) => {
            const slugifiedName = slugify(lib);
            return (
              <li key={`lib_${slugifiedName}`}><Link to={slugifiedName}>{lib}</Link></li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Home;
