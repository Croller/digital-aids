import React from 'react';
import {
  Map,
  GoogleApiWrapper, 
} from 'google-maps-react';
 
const MapContainer = ({
  zoom = 15,
  initialCenter = { lat: 40.854885, lng: -88.081807 },
  google,
  className,
  children,
}) => (
  <Map
    className={className}
    google={google}
    zoom={zoom}
    initialCenter={initialCenter}
  >
    {children}
  </Map>
);
 
export const GoogleMap = GoogleApiWrapper(({ lng = 'en' }) => ({
  language: lng,
  apiKey: 'AIzaSyA7uAl-dl4f0s9VKu_SGDA7gJr0d_xCfbg',
}))(MapContainer);
