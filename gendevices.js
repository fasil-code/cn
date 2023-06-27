const physical = require("./Physical");
const Device = physical.Device;

function createDevices(n) {
  const devices = [];
  for (let i = 1; i <= n; i++) {
    const name = `Device ${i}`;
    const mac = generateMAC();
    const ip = null;
    const device = new Device(name, mac, ip);
    devices.push(device);
  }

  return devices;
}

function generateMAC() {
  const hexChars = '0123456789ABCDEF';
  let mac = '';
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 2; j++) {
      const randomHexIndex = Math.floor(Math.random() * hexChars.length);
      mac += hexChars[randomHexIndex];
    }
    if (i < 5) {
      mac += ':';
    }
  }
  return mac;
}
function getNetworkID(ipAddress, subnetMask) {
  const ipOctets = ipAddress.split('.');
  const subnetOctets = subnetMask.split('.');

  const networkOctets = ipOctets.map((octet, index) => octet & subnetOctets[index]);

  const networkID = networkOctets.join('.');

  return networkID;
}
// const ipAddress = '192.168.1.100';
// const subnetMask = '255.255.255.0';
// const networkID = getNetworkID(ipAddress, subnetMask);
// console.log(networkID);
// Example usage:




module.exports = createDevices;
