/*eslint-disable */

import React, { PureComponent } from 'react';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import { markers, mapConfig } from '../../helper/utils';

import './PigeonMaps.styl';

const getProvider = (x, y, z) => `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}.png`;

class PigeonMaps extends PureComponent {

  onMarkerClick(evt) {
    console.log(evt.payload);
  }

  render() {
    // create an array with marker components
    const PigeonMarkers = markers.map(marker => (
      <Marker key={`marker_${marker.name}`} anchor={marker.latlng} payload={marker.name} onClick={this.onMarkerClick} />
    ));

    return (
      <div className="map">
        <Map
          width={window.innerWidth}
          height={600}
          defaultCenter={mapConfig.center}
          defaultZoom={mapConfig.zoom}
          provider={getProvider}
        >
          {PigeonMarkers}
        </Map>
      </div>
    );
  }
}

export default PigeonMaps;
