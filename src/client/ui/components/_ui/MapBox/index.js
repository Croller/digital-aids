/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import * as turf from '@turf/turf';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import * as mapGL from 'mapbox-gl';
import {
  getScale,
  getJson,
  getPaintLayer,
  paintFeature,
} from './utils';
import {
  Wrapper,
  Scale,
  Coordinates,
} from './styled';

export const MapBox = ({
  height = '100%',
  width = '100%',
  mode = null,
  layers = null,
  onClick = () => {},
  onCreate = () => {},
  className = '',
  showInfo = true,
  config = null,
}) => {
  const [map, setMap] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(0);

  const init = {
    container: 'mapbox',
    style: 'mapbox://styles/croller/ckpm77kfx7d3g17vxskgpx1ty',
    zoom: 1.50,
    center: [10, 30.0],
    minZoom: 0,
    doubleClickZoom: false,
    dragPan: true,
    dragRotate: false,
    preserveDrawingBuffer: true,
  };

  const settings = {
    token: process.env.TOKEN_MAPBOX,
    init: (config || init),
  };

  const getCoords = (e) => ({ x: e.lngLat.lat, y: e.lngLat.lng });

  const getLayer = (e, substr = 'layer') => map.queryRenderedFeatures(e.point)
    .filter(f => f.layer.id.indexOf(substr) > -1)
    .map((feature) => getJson(feature, turf));

  const setZoomTo = (arr) => {
    if (!arr) return null;
    try {
      const bounds = turf.bbox(turf.featureCollection(arr));
      map.fitBounds(bounds, {
        padding: {
          top: 150,
          bottom: 150,
          left: 200,
          right: 200,
        },
      });
    } catch (e) {
      throw e;
    }
  };

  const setLayers = (colletions) => {
    if (!colletions || colletions.length === 0) return null;
    getPaintLayer(colletions, paintFeature).forEach((layer, i) => {
      const { id } = layer;
      const prevLayerName = i !== 0 ? id : '';
      const source = map.getSource(id);
      if (map.getLayer(id) || source) {
        source.setData(layer.source.data);
      } else {
        map.addLayer(layer, layer.layerBefore === '' ? prevLayerName : layer.layerBefore);
        map.setLayoutProperty(id, 'visibility', layer.is_visible ? 'visible' : 'none');
        map.on('mousemove', id, () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', id, () => {
          map.getCanvas().style.cursor = '';
        });
      }
    });
    setZoomTo(colletions.reduce((all, colletion) => [...all, ...colletion.features], []));
  };

  const mapLoad = () => {
    setTimeout(() => {
      map.resize();
      setScale(getScale(map, turf));
      setLayers(layers);
    }, 1500);
  };

  const mapOn = () => {
    map.on('load', () => {
      setIsLoad(true);
    });
    map.on('styledata', () => {
      setIsLoad(true);
    });
    map.on('click', (e) => {
      if (mode !== null) return null;
      onClick({
        coordinates: getCoords(e),
        layers: getLayer(e),
      });
      // window.console.log(map.getStyle().sources);
      // window.console.log(map.getStyle().layers);
    });
    map.on('mousemove', (e) => {
      setCoords(getCoords(e));
      // if (isMesuaring) {
      //   onMesuare(true);
      // }
    });
    map.on('contextmenu', () => {});
    map.on('moveend', () => {
      // window.console.log(map.getStyle().sources);
      // window.console.log(map.getStyle().layers);
    });
    map.on('wheel', () => {
      setScale(getScale(map, turf));
    });
    map.on('draw.create', (e) => {
      // setDraw(setDrawMode(draw));
      onCreate(e.features.map((feature) => getJson(feature, turf)));
      onCreate(JSON.stringify(e.features.map((feature) => getJson(feature, turf))));
    });
    map.on('draw.update', (e) => {
      onCreate(e.features.map((feature) => getJson(feature, turf)));
    });
  };

  useEffect(() => {
    mapGL.accessToken = settings.token;
    setMap(new mapGL.Map({ ...settings.init }));

    return () => {
      setMap(null);
    };
  }, []);

  useEffect(() => {
    if (map) {
      mapOn();
    }
  }, [map]);

  useEffect(() => {
    if (isLoad) {
      mapLoad();
    }
  }, [isLoad, layers]);

  return (
    <Wrapper
      id="mapbox"
      height={height}
      width={width}
      className={`t-map ${className}`}
    >
      {showInfo && (
        <>
          <Coordinates>{`X: ${coords.x.toFixed(6)} Y: ${coords.y.toFixed(6)}`}</Coordinates>
          <Scale>{`М 1:${scale}`}</Scale>
        </>
      )}
    </Wrapper>
  );
};
