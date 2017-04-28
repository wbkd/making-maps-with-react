import React, { PureComponent } from 'react';
import MapGL, { ScatterplotOverlay } from 'react-map-gl';
import CONFIG from '../../../config_local.json';
import { mapConfig, locations } from '../../helper/utils';

class ReactMapGL extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        width: window.innerWidth,
        height: 600,
        latitude: mapConfig.center[0],
        longitude: mapConfig.center[1],
        zoom: mapConfig.zoom,
        isDragging: false,
        startDragLngLat: mapConfig.center,
        pitch: 50,
        bearing: 0
      }
    };

    this.onChangeViewport = this.onChangeViewport.bind(this);
  }

  onChangeViewport(viewport) {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  }

  render() {
    const { viewport } = this.state;
    return (
      <div className="reactmapgl">
        <MapGL
          {...viewport}
          mapboxApiAccessToken={CONFIG.MAPBOX_ACCESS_TOKEN}
          perspectiveEnabled
          onChangeViewport={this.onChangeViewport}
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
