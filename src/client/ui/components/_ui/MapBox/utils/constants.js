export const paintFeature = {
  vector: {
    MultiPolygon: [
      {
        type: 'fill',
        id: 'layer',
        paint: {
          'fill-color': '#7ae25a',
          'fill-opacity': 0.3,
          'fill-outline-color': '#66B350',
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'line',
        id: 'contour',
        paint: {
          'line-color': '#66B350',
          'line-width': 1,
        },
        layout: {},
        layerBefore: null,
      },
    ],
    Point: [
      {
        type: 'circle',
        id: 'layer',
        paint: {
          'circle-color': '#66B350',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#FFFFFF',
        },
        layout: {},
        layerBefore: null,
      },
    ],
  },
  image: {
    Point: {
      type: 'symbol',
      id: 'layer',
      layout: {
        // 'icon-image': 'cat',
        'icon-size': 1,
      },
      layerBefore: null,
    },
  },
  geojson: {
    MultiPolygon: [
      {
        type: 'fill',
        id: 'layer',
        filter: ['==', '$type', 'Polygon'],
        paint: {
          'fill-color': '#8ea7ff',
          'fill-opacity': 0.3,
          'fill-outline-color': '#0F6DA5',
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'line',
        id: 'contour',
        filter: ['==', '$type', 'Polygon'],
        paint: {
          'line-color': '#0F6DA5',
          'line-width': 1,
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'fill',
        id: 'select',
        filter: ['==', 'guid', ''],
        paint: {
          'fill-color': '#16a165',
          'fill-opacity': 0.5,
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'fill',
        id: 'click',
        filter: ['==', 'guid', ''],
        paint: {
          'fill-color': '#7d9aff',
          'fill-opacity': 0.4,
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'fill',
        id: 'hover',
        filter: ['==', 'guid', ''],
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
        id: 'layer',
        filter: ['==', '$type', 'Polygon'],
        paint: {
          'fill-color': '#8ea7ff',
          'fill-opacity': 0.1,
          'fill-outline-color': '#02A9E0',
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'line',
        id: 'contour',
        filter: ['==', '$type', 'Polygon'],
        paint: {
          'line-color': '#02A9E0',
          'line-width': 1,
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'fill',
        id: 'select',
        filter: ['==', 'guid', ''],
        paint: {
          'fill-color': '#16a165',
          'fill-opacity': 0.2,
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'fill',
        id: 'click',
        filter: ['==', 'guid', ''],
        paint: {
          'fill-color': '#7d9aff',
          'fill-opacity': 0.4,
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'fill',
        id: 'hover',
        filter: ['==', 'guid', ''],
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
        id: 'layer',
        filter: ['!has', 'point_count'],
        paint: {
          'circle-color': '#0f6da5',
          'circle-radius': 5,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#FFFFFF',
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'symbol',
        id: 'count',
        filter: ['has', 'point_count'],
        paint: {
          'text-color': '#ffffff',
        },
        layout: {
          // 'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 14,
        },
        layerBefore: null,
      },
      {
        type: 'circle',
        id: 'clusters',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#0f6da5',
            100,
            '#3D927C',
            500,
            '#66B350',
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40,
          ],
          'circle-stroke-width': 1,
          'circle-stroke-color': '#FFFFFF',
          'circle-opacity': 1,
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'circle',
        id: 'select',
        filter: ['==', 'guid', ''],
        paint: {
          'circle-color': '#66B350',
          'circle-radius': 6,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#FFFFFF',
          'circle-opacity': 1,
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'circle',
        id: 'click',
        filter: ['==', 'guid', ''],
        paint: {
          'circle-color': '#7d9aff',
          'circle-radius': 6,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#FFFFFF',
          'circle-opacity': 1,
        },
        layout: {},
        layerBefore: null,
      },
      {
        type: 'circle',
        id: 'hover',
        paint: {
          'circle-color': '#7896ff',
          'circle-radius': 5,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#FFFFFF',
        },
        layout: {},
        layerBefore: null,
      },
    ],
  },
};

export const paintDraw = [
  {
    id: 'highlight-active-points',
    type: 'circle',
    filter: ['all',
      ['==', '$type', 'Point'],
      ['==', 'meta', 'feature'],
      ['==', 'active', 'true']],
    paint: {
      'circle-radius': 7,
      'circle-color': '#02A9E0',
    },
  },
  {
    id: 'points-are-blue',
    type: 'circle',
    filter: ['all',
      ['==', '$type', 'Point'],
      ['==', 'meta', 'feature'],
      ['==', 'active', 'false']],
    paint: {
      'circle-radius': 5,
      'circle-color': '#000088',
    },
  },
  // line stroke
  {
    id: 'gl-draw-line',
    type: 'line',
    filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#02A9E0',
      'line-dasharray': [2, 5],
      'line-width': 2,
    },
  },
  // polygon fill
  {
    id: 'gl-draw-polygon-fill',
    type: 'fill',
    filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
    paint: {
      'fill-color': '#02A9E0',
      'fill-outline-color': '#02A9E0',
      'fill-opacity': 0.1,
    },
  },
  // polygon outline stroke
  // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
  {
    id: 'gl-draw-polygon-stroke-active',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#02A9E0',
      'line-dasharray': [2, 5],
      'line-width': 2,
    },
  },
  // vertex point halos
  {
    id: 'gl-draw-polygon-and-line-vertex-halo-active',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    paint: {
      'circle-radius': 5,
      'circle-color': '#FFFFFF',
    },
  },
  // vertex points
  {
    id: 'gl-draw-polygon-and-line-vertex-active',
    type: 'circle',
    filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    paint: {
      'circle-radius': 3,
      'circle-color': '#02A9E0',
    },
  },

  // INACTIVE (static, already drawn)
  // line stroke
  {
    id: 'gl-draw-line-static',
    type: 'line',
    filter: ['all', ['==', '$type', 'LineString'], ['==', 'mode', 'static']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#02A9E0',
      'line-width': 3,
    },
  },
  // polygon fill
  {
    id: 'gl-draw-polygon-fill-static',
    type: 'fill',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'static']],
    paint: {
      'fill-color': '#02A9E0',
      'fill-outline-color': '#02A9E0',
      'fill-opacity': 0.1,
    },
  },
  // polygon outline
  {
    id: 'gl-draw-polygon-stroke-static',
    type: 'line',
    filter: ['all', ['==', '$type', 'Polygon'], ['==', 'mode', 'static']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#02A9E0',
      'line-width': 3,
    },
  },
  {
    id: 'gl-draw-polygon-fill-inactive',
    type: 'fill',
    filter: ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['!=', 'mode', 'static'],
    ],
    paint: {
      'fill-color': '#02A9E0',
      'fill-outline-color': '#02A9E0',
      'fill-opacity': 0.1,
    },
  },
  {
    id: 'gl-draw-polygon-fill-active',
    type: 'fill',
    filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
    paint: {
      'fill-color': '#02A9E0',
      'fill-outline-color': '#02A9E0',
      'fill-opacity': 0.1,
    },
  },
  {
    id: 'gl-draw-polygon-midpoint',
    type: 'circle',
    filter: ['all',
      ['==', '$type', 'Point'],
      ['==', 'meta', 'midpoint']],
    paint: {
      'circle-radius': 3,
      'circle-color': '#02A9E0',
    },
  },
  {
    id: 'gl-draw-polygon-stroke-inactive',
    type: 'line',
    filter: ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Polygon'],
      ['!=', 'mode', 'static'],
    ],
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#02A9E0',
      'line-width': 2,
    },
  },
  {
    id: 'gl-draw-line-inactive',
    type: 'line',
    filter: ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'LineString'],
      ['!=', 'mode', 'static'],
    ],
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#02A9E0',
      'line-width': 2,
    },
  },
  {
    id: 'gl-draw-line-active',
    type: 'line',
    filter: ['all',
      ['==', '$type', 'LineString'],
      ['==', 'active', 'true'],
    ],
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#02A9E0',
      'line-dasharray': [2, 5],
      'line-width': 2,
    },
  },
  {
    id: 'gl-draw-point-point-stroke-inactive',
    type: 'circle',
    filter: ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Point'],
      ['==', 'meta', 'feature'],
      ['!=', 'mode', 'static'],
    ],
    paint: {
      'circle-radius': 5,
      'circle-opacity': 1,
      'circle-color': '#FFFFFF',
    },
  },
  {
    id: 'gl-draw-point-inactive',
    type: 'circle',
    filter: ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'Point'],
      ['==', 'meta', 'feature'],
      ['!=', 'mode', 'static'],
    ],
    paint: {
      'circle-radius': 3,
      'circle-color': '#02A9E0',
    },
  },
  {
    id: 'gl-draw-point-stroke-active',
    type: 'circle',
    filter: ['all',
      ['==', '$type', 'Point'],
      ['==', 'active', 'true'],
      ['!=', 'meta', 'midpoint'],
    ],
    paint: {
      'circle-radius': 7,
      'circle-color': '#FFFFFF',
    },
  },
  {
    id: 'gl-draw-point-active',
    type: 'circle',
    filter: ['all',
      ['==', '$type', 'Point'],
      ['!=', 'meta', 'midpoint'],
      ['==', 'active', 'true']],
    paint: {
      'circle-radius': 5,
      'circle-color': '#02A9E0',
    },
  },
  {
    id: 'gl-draw-point-static',
    type: 'circle',
    filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Point']],
    paint: {
      'circle-radius': 5,
      'circle-color': '#02A9E0',
    },
  },
];
