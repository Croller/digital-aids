const sensor = require('node-dht-sensor');
 
const read_DHT22 = () => {
  sensor.read(22, 4, (err, temperature, humidity) => {
    if (!err) {
      console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
    } else {
      console.log(err);
    }
  });
};

module.exports = {
  read_DHT22,
};
