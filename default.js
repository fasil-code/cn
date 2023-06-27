const DataLink = require("./DataLink");
const Switch = DataLink.Switch;
const createDevices = require("./gendevices");
class DataPacket {
  constructor(sourceMac, destinationMac, data) {
    this.sourceMac = sourceMac;
    this.destinationMac = destinationMac;
    this.data = data;
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
 connected(device){

  this.connected_devices.push(device);
  console.log("Connected "+device.name +" to "+this.name);
}
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

module.exports={
  Router,
  Interf,
  DataPacket,
 
}
























