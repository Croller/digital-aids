export const getLayerObj = ({
  id = '0000',
  features = null,
  options = null,
  url = null,
  coordinates = null,
}) => ({
  geojson: {
    id,
    options,
    is_select: false,
    is_visible: true,
    is_editing: false,
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features,
      },
    },
  },
  raster: {
    id,
    options,
    is_select: false,
    is_visible: true,
    is_editing: false,
    source: {
      url,
      type: 'image',
      coordinates,
    },
  }, 
});

export const setLayersConf = (layers, callback) => ((!layers || layers.length === 0) ? [] : layers.reduce((arr, layer) => {
  const { id, options, source } = layer;
  const { type } = source;

  let typePaint = null;
  switch (true) {
    case type === 'geojson': {
      const feature = source.data.features.find(f => f.geometry);
      typePaint = feature ? feature.geometry.type : null;
      break;
    }
    case type === 'vector':
      typePaint = options.geometry.type;
      break;
    case type === 'image':
      typePaint = 'raster';
      break;
    default:
      break;
  }

  // set style paint by type
  if (typePaint && type) {
    const paints = callback(options && options.color)[type][typePaint];
    if (paints) {
      return [...arr, ...paints.map(p => {
        const layerObj = {
          ...layer,
          layerConfig: {
            ...p,
            id: `${id}_${p.name}`,
            source,
          },
        };
        if (type === 'vector') {
          layerObj.layerConfig['source-layer'] = `${id.split('_')[1]}`;
        }
        return layerObj;
      })];
    }
  } else {
    return [...arr, {
      ...layer,
      layerConfig: {
        id: `${id}_`,
        source,
      },
    }];
  }
  return arr;
}, []));

export const layerPaints = (color = null) => ({
  image: {
    raster: [
      {
        type: 'raster',
        name: 'da_layer',
        paint: {
          'raster-opacity': 1,
        },
      },
    ],
  },
  geojson: {
    MultiPolygon: [
      {
        type: 'fill',
        name: 'da_layer',
        filter: ['==', '$type', 'Polygon'],
        paint: {
          'fill-color': (color || '#8ea7ff'),
          'fill-opacity': 0.3,
          'fill-outline-color': (color || '#0F6DA5'),
        },
        layout: {},
        layerBefore: 'place-city-sm',
      },
      {
        type: 'line',
        name: 'da_contour',
        filter: ['==', '$type', 'Polygon'],
        paint: {
          'line-color': (color || '#0F6DA5'),
          'line-width': 1,
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'fill',
        name: 'da_select',
        filter: ['==', 'id', ''],
        paint: {
          'fill-color': '#16a165',
          'fill-opacity': 0.5,
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'fill',
        name: 'da_click',
        filter: ['==', 'id', ''],
        paint: {
          'fill-color': '#7d9aff',
          'fill-opacity': 0.4,
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'fill',
        name: 'da_hover',
        filter: ['==', 'id', ''],
        paint: {
          'fill-color': '#7896ff',
          'fill-opacity': 0.4,
        },
        layout: {},
        layerBefore: null,
      },
    ],
    Polygon: [
      {
        type: 'fill',
        name: 'da_layer',
        filter: ['==', '$type', 'Polygon'],
        paint: {
          'fill-color': (color || '#8ea7ff'),
          'fill-opacity': 0.3,
          'fill-outline-color': (color || '#0F6DA5'),
        },
        layout: {},
        layerBefore: 'place-city-sm',
      },
      {
        type: 'line',
        name: 'da_contour',
        filter: ['==', '$type', 'Polygon'],
        paint: {
          'line-color': (color || '#0F6DA5'),
          'line-width': 1,
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'fill',
        name: 'da_select',
        filter: ['==', 'id', ''],
        paint: {
          'fill-color': '#16a165',
          'fill-opacity': 0.5,
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'fill',
        name: 'da_click',
        filter: ['==', 'id', ''],
        paint: {
          'fill-color': '#7d9aff',
          'fill-opacity': 0.4,
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'fill',
        name: 'da_hover',
        filter: ['==', 'id', ''],
        paint: {
          'fill-color': '#7896ff',
          'fill-opacity': 0.4,
        },
        layout: {},
        layerBefore: null,
      },
    ],
    Point: [
     
      {
        type: 'circle',
        name: 'da_layer',
        filter: ['!has', 'point_count'],
        paint: {
          'circle-color': '#219653',
          'circle-radius': 6,
          'circle-stroke-width': 3,
          'circle-stroke-color': (color || '#ffffff'),
          // 'circle-color': [
          //   'case',
          //   ['boolean', ['feature-state', 'hover'], false],
          //   '#219653',
          //   '#7d9aff',
          // ],
        },
        layout: {},
        layerBefore: 'place-city-sm',
      },
      {
        type: 'circle',
        name: 'da_shadow',
        filter: ['!has', 'point_count'],
        paint: {
          'circle-color': '#000000',
          'circle-radius': 12,
          'circle-blur': 0.8,
        },
        layout: {},
        layerBefore: null,
      },
      // {
      //   type: 'symbol',
      //   name: 'da_count',
      //   filter: ['has', 'point_count'],
      //   paint: {
      //     'text-color': (color || '#ffffff'),
      //   },
      //   layout: {
      //     // 'text-field': '{point_count_abbreviated}',
      //     'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      //     'text-size': 14,
      //   },
      //   layerBefore: 'place-city-sm',
      // },
      // {
      //   type: 'circle',
      //   name: 'da_clusters',
      //   filter: ['has', 'point_count'],
      //   paint: {
      //     'circle-color': [
      //       'step',
      //       ['get', 'point_count'],
      //       '#0f6da5',
      //       100,
      //       '#3D927C',
      //       500,
      //       '#66B350',
      //     ],
      //     'circle-radius': [
      //       'step',
      //       ['get', 'point_count'],
      //       20,
      //       100,
      //       30,
      //       750,
      //       40,
      //     ],
      //     'circle-stroke-width': 1,
      //     'circle-stroke-color': (color || '#ffffff'),
      //     'circle-opacity': 1,
      //   },
      //   layout: {},
      //   layerBefore: 'place-city-sm',
      // },
      // {
      //   type: 'circle',
      //   name: 'da_select',
      //   filter: ['==', 'id', ''],
      //   paint: {
      //     'circle-color': '#66B350',
      //     'circle-radius': 6,
      //     'circle-stroke-width': 1,
      //     'circle-stroke-color': '#ffffff',
      //     'circle-opacity': 1,
      //   },
      //   layout: {},
      //   layerBefore: 'place-city-sm',
      // },
      // {
      //   type: 'circle',
      //   name: 'da_click',
      //   filter: ['==', 'id', ''],
      //   paint: {
      //     'circle-color': '#7d9aff',
      //     'circle-radius': 6,
      //     'circle-stroke-width': 1,
      //     'circle-stroke-color': '#ffffff',
      //     'circle-opacity': 1,
      //   },
      //   layout: {},
      //   layerBefore: 'place-city-sm',
      // },
      {
        type: 'circle',
        name: 'da_hover',
        paint: {
          'circle-color': '#7896ff',
          'circle-radius': 5,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff',
        },
        layout: {},
        layerBefore: null,
      },
    ],
  },
});
