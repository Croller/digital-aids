import React from 'react';
import {
  Map,
  GoogleApiWrapper, 
} from 'google-maps-react';
// TODO lng to props, getLocal delete
import { getLocalUser } from 'client/utils/localStorage';
 
const MapContainer = ({
  zoom = 15,
  initialCenter = { lat: 40.854885, lng: -88.081807 },
  google,
  className,
  center,
  children,
}) => (
  <Map
    className={className}
    google={google}
    zoom={zoom}
    center={center}
    initialCenter={initialCenter}
  >
    {children}
  </Map>
);
 
export const GoogleMap = GoogleApiWrapper(({ lng = 'en' }) => {
  const user = getLocalUser();
  return {
    language: user.lng || lng,
    apiKey: process.env.API_KEY_GOOGLE_MAP,
  };
})(MapContainer);
