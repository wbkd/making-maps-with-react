import React, { PureComponent } from 'react';

import MapGL from 'react-map-gl';

import CONFIG from '../../../config_local.json';

import { mapConfig } from '../../helper/utils';

import './ReactMapGL.styl';

class ReactMapGL extends PureComponent {

  render() {
    return (
      <div className="reactmapgl">
        <MapGL
          width={window.innerWidth}
          height={600}
          latitude={mapConfig.center[0]}
          longitude={mapConfig.center[1]}
          zoom={mapConfig.zoom}
          mapboxApiAccessToken={CONFIG.MAPBOX_ACCESS_TOKEN}
          onChangeViewport={() => {}}
        />
      </div>
    );
  }
}

export default ReactMapGL;
