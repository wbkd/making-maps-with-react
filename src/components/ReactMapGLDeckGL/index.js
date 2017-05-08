/*eslint-disable */
import React, { PureComponent } from 'react';

import MapGL from 'react-map-gl';
import DeckGL, { GeoJsonLayer, ScatterplotLayer, ScreenGridLayer } from 'deck.gl';
import { json as requestJson } from 'd3-request';

import CONFIG from '../../../config.json';

import { mapConfig, scatterPlotData, getColor } from '../../helper/utils';

class ReactMapGLDeckGL extends PureComponent {
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
      },
      geojson: null
    };

    requestJson(`${process.env.BASENAME}data/berlin_bezirke.json`, (error, response) => {
      if (!error) {
        this.setState({ geojson: response });
      }
    });


    this.onChangeViewport = this.onChangeViewport.bind(this);
  }

  onChangeViewport(viewport) {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  }

  initialize(gl) {
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE_MINUS_DST_ALPHA, gl.ONE);
    gl.blendEquation(gl.FUNC_ADD);
  }

  render() {
    const { viewport, geojson } = this.state;

    // const scatterplotLayer = new ScatterplotLayer({
    //   id: 'scatter-plott-layer',
    //   data: scatterPlotData,
    //   radiusScale: 50,
    //   outline: true,
    //   getPosition: d => d.position
    // });

    const geosjsonLayer = new GeoJsonLayer({
      id: 'geojson-layer',
      data: geojson,
      filled: false,
      stroked: true,
      lineWidthMinPixels: 1,
      lineWidthScale: 1,
      getLineColor: d => [175, 175, 175]
    });

    const screenGridLayer = new ScreenGridLayer({
      id: 'screen-grid-layer',
      data: scatterPlotData,
      cellSizePixels: 10,
      minColor: [43, 140, 190, 0],
      maxColor: [43, 140, 190, 255]
    });

    return (
      <div className="reactmapgldeckgl">
        <MapGL
          {...viewport}
          mapboxApiAccessToken={CONFIG.MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          perspectiveEnabled
          onChangeViewport={this.onChangeViewport}
        >
          <DeckGL
            {...viewport}
            layers={[geosjsonLayer, screenGridLayer]}
            onWebGLInitialized={this.initialize}
          />
        </MapGL>
      </div>
    );
  }
}

export default ReactMapGLDeckGL;
