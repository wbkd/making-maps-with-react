import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import 'normalize.css';

import Header from './components/Header';
import Home from './components/Home';
import ReactLeafletMap from './components/ReactLeaflet';
import PigeonMaps from './components/PigeonMaps';

import './styles/main.styl';

ReactDOM.render(
  <BrowserRouter>
    <div className="app">
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/react-leaflet" component={ReactLeafletMap} />
      <Route path="/pigeon-maps" component={PigeonMaps} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
