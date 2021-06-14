/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import * as turf from '@turf/turf';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import * as mapGL from 'mapbox-gl';
import { getScale } from './utils/common';
import { setLayersConf, layerPaints } from './utils/create';
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
    token: process.env.API_KEY_MAPBOX,
    init: (config || init),
  };

  const getCoords = (e) => ({ x: e.lngLat.lat, y: e.lngLat.lng });

  const getLayer = (e, substr = 'layer') => {
    const filtred = map.queryRenderedFeatures(e.point).filter(f => f.layer.id.indexOf(substr) > -1);
    return filtred.length === 0 ? null : filtred;
  };

  // const setZoomTo = (arr) => {
  //   if (!arr) return null;
  //   try {
  //     const bounds = turf.bbox(turf.featureCollection(arr));
  //     map.fitBounds(bounds, {
  //       padding: {
  //         top: 150,
  //         bottom: 150,
  //         left: 200,
  //         right: 200,
  //       },
  //     });
  //   } catch (e) {
  //     throw e;
  //   }
  // };

  const setLayers = (list) => {
    if (list && list.length > 0) {
      const features = setLayersConf(list, layerPaints);
      features.forEach((layer, i) => {
        if ('layerConfig' in layer) {
          const layerName = layer.layerConfig.id;
          const source = map.getSource(layerName);
          if (!source) {
            let prevLayerName = '';
            if (features.length > 0 && i > 0) {
              prevLayerName = features[i - 1].layerConfig.id;
            } else {
              prevLayerName = '';
            }
            // console.log(layer.layerConfig);
            map.addLayer(layer.layerConfig, layer.layerBefore || prevLayerName);
            map.on('mousemove', layerName, (e) => {
              map.getCanvas().style.cursor = 'pointer';
              // console.log(`${layer.id}_da_hover`, e.features);
              // map.setFeatureState(
              //   { source: `${layer.id}_da_layer` },
              //   { hover: true },
              // );
              map.setFilter(`${layer.id}_da_hover`, ['==', 'id', e.features[0].properties.id]);
            });
            map.on('mouseleave', layerName, () => {
              map.getCanvas().style.cursor = '';
              map.setFilter(`${layer.id}_da_hover`, ['==', 'id', '']);
              // map.setFeatureState(
              //   { source: `${layer.id}_da_layer` },
              //   { hover: false },
              // );
            });
            // if (layer.layerConfig.source.type === 'geojson') {
            //   this.setZoomTo(layer.layerConfig.source.data.features);
            // }
          } else {
            source.setData(layer.layerConfig.source.data);
          }
          map.setLayoutProperty(layerName, 'visibility', layer.is_visible ? 'visible' : 'none');
        }
      });
    }
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
    });
    map.on('contextmenu', () => {});
    map.on('moveend', () => {});
    map.on('wheel', () => {
      setScale(getScale(map, turf));
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
