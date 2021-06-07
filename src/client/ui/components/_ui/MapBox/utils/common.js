export const getScale = (draw, turf, units) => {
  const inchesPerMeter = 39.37;
  const screenDPI = 96.0;
  const bounds = draw.getBounds();
  const size = draw.getCanvas();
  // eslint-disable-next-line no-underscore-dangle
  const distance = turf.distance(turf.point([bounds._ne.lng, bounds._ne.lat]), turf.point([bounds._ne.lng, bounds._sw.lat]), { units });
  const scaleValue = Math.floor((Math.abs(distance * 1000) / size.width) * inchesPerMeter * screenDPI);
  return scaleValue;
};

export const getJson = (feature, turf) => {
  const { properties, geometry } = feature;
  const prop = Object.keys(properties).reduce((obj, key) => {
    let value = properties[key];
    if (typeof value === 'string') {
      if (value.indexOf('[') > -1) {
        value = eval(value);
      }
      if (value === 'null') {
        value = null;
      }
    }
    return { ...obj, [key]: value };
  }, {});
  return turf.feature(geometry, prop);
};
