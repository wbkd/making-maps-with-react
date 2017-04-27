import React, { PureComponent } from 'react';

import MapGL from 'react-map-gl';
import DeckGL, { HexagonLayer } from 'deck.gl';

import CONFIG from '../../../config_local.json';

import { mapConfig, hexaData } from '../../helper/utils';

class ReactMapGLDeckGL extends PureComponent {
  render() {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: mapConfig.center[0],
      longitude: mapConfig.center[1],
      zoom: mapConfig.zoom,
      isDragging: false,
      startDragLngLat: mapConfig.center,
      pitch: 0,
      bearing: 0
    };

    // https://uber.github.io/deck.gl/#/documentation/layer-catalog/hexagon-layer
    const layer = new HexagonLayer({
      id: 'hexagon-layer',
      data: hexaData,
      colorDomain: [0, 100],
      cellSize: 500,
      visible: true,
      extruded: true,
      opacity: 1
    });

    return (
      <div className="reactmapgldeckgl">
        <MapGL
          {...viewport}
          mapboxApiAccessToken={CONFIG.MAPBOX_ACCESS_TOKEN}
        >
          <DeckGL
            {...viewport}
            layers={[layer]}
          />
        </MapGL>
      </div>
    );
  }
}

export default ReactMapGLDeckGL;
