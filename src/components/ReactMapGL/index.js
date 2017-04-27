import React, { PureComponent } from 'react';

import MapGL, { ScatterplotOverlay } from 'react-map-gl';

import CONFIG from '../../../config_local.json';

import { mapConfig, locations } from '../../helper/utils';

import './ReactMapGL.styl';

class ReactMapGL extends PureComponent {
  render() {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: mapConfig.center[0],
      longitude: mapConfig.center[1],
      zoom: mapConfig.zoom,
      isDragging: false,
      startDragLngLat: mapConfig.center
    };
    return (
      <div className="reactmapgl">
        <MapGL
          {...viewport}
          mapboxApiAccessToken={CONFIG.MAPBOX_ACCESS_TOKEN}
        >
          <ScatterplotOverlay
            {...viewport}
            locations={locations}
            dotRadius={2}
            globalOpacity={1}
            compositeOperation="screen"
            dotFill="#1FBAD6"
            renderWhileDragging
          />
        </MapGL>
      </div>
    );
  }
}

export default ReactMapGL;
