# Digital-Aids 

## Brain House Electric

### Proejct
- Raspberry Pi [pinout](https://cdn.sparkfun.com/assets/learn_tutorials/6/7/6/PiZero_1.pdf)
- Node js [install](https://hassancorrigan.com/blog/install-nodejs-on-a-raspberry-pi-zero/)
```
wget https://unofficial-builds.nodejs.org/download/release/v16.9.1/node-v12.9.1-linux-armv6l.tar.xz  
tar xvfJ node-v12.9.1-linux-armv6l.tar.xz  
sudo cp -R node-v12.9.1-linux-armv6l/* /usr/local
rm -rf node-*
sudo reboot
node -v && npm -v
```

Extra steps
```
sudo nano ~/.profile
PATH=$PATH:/usr/local/bin
```

### Sensor
- DHT22 temperature-humidity sensor (3 pin) [manual](https://www.npmjs.com/package/node-dht-sensor)
- TLS2561 light intensity sensor [manual](https://www.instructables.com/Lux-Sensor-TSL2561-Raspberry-Pi/), [library](https://github.com/fivdi/i2c-bus#usage)


### Library