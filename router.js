const DataLink = require("./DataLink");
const Switch = DataLink.Switch;
const createDevices = require("./gendevices");
function generateRandomPort() {
  const minPort = 1024;
  const maxPort = 65535;


  return Math.floor(Math.random() * (maxPort - minPort + 1)) + minPort;
}
class Layer3{
constructor(sourceip,destinationip){
this.sourceip=sourceip;
this.destinationip=destinationip;
}


}
class DataPacket {
  constructor(sourceMac, destinationMac, data,sourcePort,destinationPort) {
    this.sourceMac = sourceMac;
    this.destinationMac = destinationMac;
    this.data = data;
    this.sourcePort=sourcePort;
    this.destinationPort=destinationPort;
  }
}
class Interf{
constructor(name,ip,mac,router){
this.name=name;
this.ipAddress=ip;
this.macAddress=mac;
this.parent=router;
this.type=4;
this.connected_devices=[];
}
allocateIPAddress(ipAddress) {
  this.ipAddress=ipAddress;
}
receive(packet,s,type){
console.log("Recieved sucessfully");
let sp1=packet.sourcePort;
let dp1=packet.destinationPort;

if(type=="data"){
console.log("sending arp request to destination");

router.arp[s.destinationip]=s.destinationmac;
  Switch2.receivePacket(new DataPacket(
    a1,
  devices[2],
    "Hello",sp1,dp1
  ),"port3","hub",a1,-1,"arp")

}

console.log("\x1b[34m",'recieved packet from port number '+sp1+" to "+dp1," \x1b[0m");


}
 connected(device){

  this.connected_devices.push(device);
  console.log("Connected "+device.name +" to "+this.name);
}
}
function nid(ip) {
  let parts = ip.split('/');
  let ipAddress = parts[0];
  let mask = parseInt(parts[1], 10);

  // Calculate the subnet mask
  let subnetMask = (0xffffffff << (32 - mask)) >>> 0;

  // Apply the mask using bitwise AND
  let maskedIP = ipAddress.split('.').map(Number);
  for (let i = 0; i < 4; i++) {
    maskedIP[i] &= (subnetMask >> (8 * (3 - i))) & 255;
  }

  return maskedIP.join('.');
}
  class Router{
  constructor(name){
    this.name=name;
    this.routingtable=[];
    this.connected_interfaces=[];
    this.arp={}
    this.type=3;
    this.static=[];

  }
  addInterface(interf) {
  
    this.connected_interfaces.push(interf);
    console.log(`Interface ${interf.name} added to the `+this.name);
  }

  getInterfaces() {
    return this.connected_interfaces;
  }
  reciever(packet,nid){

for (let i=0;i<this.static.length;i++){
    
   let comp=this.static[i][0];
   if(comp===nid){
    console.log(this.name+" sending data to "+this.static[i][1].name+" through  interface")
   this.static[i][1].reciever(packet,"192.168.2.0");

   }
   else{
    console.log("Destination network found");
    console.log("Transmiting to host");
    var switch11;
    for (let i=0;i<this.connected_interfaces.length;i++){
if(this.connected_interfaces[i].connected_devices[0]==undefined)continue;
     this.connected_interfaces[i].connected_devices[0].receivePacket(packet,"port2","eth",1);
    }


   }


}

  }






}



const router = new Router();
const a1=new Interf("eth0", "11.11.11.1","a:b:c",router);
const b1=new Interf("eth1", "22.22.22.1","d:e:f",router);

const devices=createDevices(4);
const Switch1=new Switch("switch1");
const Switch2=new Switch("switch2");
function run(){
router.addInterface(a1);
router.addInterface(b1);



devices[0].macAddress="aaaa";
devices[1].macAddress="bbbb";
devices[2].macAddress="cccc";


devices[3].macAddress="dddd";

devices[0].ipAddress='11.11.11.10/24'
devices[1].ipAddress='11.11.11.20/24'



devices[2].ipAddress='22.22.22.30/24'
devices[3].ipAddress='22.22.22.40/24'

router.routingtable.push({a1:'11.11.11.0/24'});
router.routingtable.push({b1:'22.22.22.0/24'});


Switch1.connect(devices[0]);
Switch1.connect(devices[1]);
devices[0].connect(Switch1, 2);
devices[1].connect(Switch1, 2);

Switch1.connect(a1);
Switch2.connect(devices[2]);
Switch2.connect(devices[3]);
devices[2].connect(Switch2, 2);
devices[3].connect(Switch2, 2);
Switch2.connect(b1);

const s=devices[0];
const d=devices[2];

const sp=generateRandomPort();
const dp=generateRandomPort();
console.log(sp,dp)
if(nid(s.ipAddress)===nid(d.ipAddress)){
  Switch1.receivePacket(
    new DataPacket(
      s,
      d,
      "Hello",sp,dp
    ),"port1","hub",a1,"arp"
  
  )

}
else{

console.log("Sending arp request to find router macadress");
Switch1.receivePacket(new DataPacket(
  devices[0],
  a1,
  "Hello",sp,dp
),"port1","hub",a1,-1,"arp")










}




console.log("device arp table")
devices[0].arp_table[a1.ipAddress]=a1.macAddress;
console.log(devices[0].arp_table);


// console.log("data");
Switch1.receivePacket(new DataPacket(
  devices[0],
  a1,
  "Hello",sp,dp
),"port0","hub",a1,-1,"data")

}


module.exports = {
run,generateRandomPort
}





