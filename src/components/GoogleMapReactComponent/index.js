import React, { PureComponent } from 'react';
import GoogleMapReact from 'google-map-react';
import CONFIG from '../../../config.json';
import { markers, mapConfig } from '../../helper/utils';

import './style.styl';

const CustomMarker = ({ text }) => <div className="custom-marker"><p>{text}</p></div>;

class GoogleMapReactComponent extends PureComponent {
  render() {
    const GoogleMapsMarkers = markers.map(marker => (
      <CustomMarker
        key={`marker_${marker.name}`}
        lat={marker.latlng[0]}
        lng={marker.latlng[1]}
        text={marker.name}
      />
    ));

    return (
      <GoogleMapReact
        defaultCenter={mapConfig.center}
        defaultZoom={mapConfig.zoom}
        layerTypes={['TrafficLayer', 'TransitLayer']}
        bootstrapURLKeys={{
          key: CONFIG.GOOGLE_MAPS_API_KEY,
          language: 'de'
        }}
      >
        {GoogleMapsMarkers}
      </GoogleMapReact>
    );
  }
}

export default GoogleMapReactComponent;
