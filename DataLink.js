class DataPacket {
  constructor(sourceMac, destinationMac, data) {
    this.sourceMac = sourceMac;
    this.destinationMac = destinationMac;
    this.data = data;
  }
}
class Switch {
    constructor(name) {
      this.name=name;

      this.macTable = {}; 
      this.connectedports = []; 
    }
  
    connect(device) {
      if(this.connectedports.includes(device)){
        console.log('DEvices already Connected');
        return;
      }
      this.connectedports.push(device);
      console.log(`${this.name} is connected to ${device.name}`)
    }
  
    receivePacket(packet, sourcePort,sourceHub,inter,cross,type) {
let sp=packet.sourcePort
let dp=packet.destinationPort;
    
      const destination = packet.destinationMac;
      const source = packet.sourceMac;
     
  //console.log(source,destination,sourcePort);

      
  this.macTable[source.macAddress]=sourcePort
      if (destination.macAddress in this.macTable) {
        const destinationPort = this.macTable[destination.macAddress];
      let hub_connected;
      
    
        hub_connected=destination.connected_devices[0].device;
      
      
// console.log(hub_connected)


      
          if(hub_connected==sourceHub){
            console.log("Discarded by SWitch");
          }
          else{
            console.log("\x1b[33m",'Data Unicasted to all destination end devices by  Switch ','\x1b[0m');
            if(hub_connected.type==1){
              hub_connected.send_data("10001",source,destination,"rec");
            }
            else{
              destination.receive();
            }
       
          }
        
        
      } 
      else {
       
        console.log("\x1b[33m",'Data Broadcasted to all connected end devices by  Switch ','\x1b[0m');


        this.connectedports.forEach((port, index) => {
          let t=index+1
          if ("port"+t != sourcePort) {
          
           if(port.type==1 ){

            if(port.name==sourceHub.name){

            }
            else{
            
              port.send_data('1001001',packet.sourceMac,packet.destinationMac,"rec")
            }
           
           }
          else{ 
            console.log('Sending data to ',port.name);
            if(port.macAddress==destination.macAddress ||(port.ipAddress!=null && port.ipAdress==destination.ipAddress)){
             
              port.receive(packet, sourcePort,type);
            }

//             else if(port.name=="eth0" && type=="arp"){
//     if(gateway.ipAddress==port.ipAddress){
//   const router=gateway.parent
//   gateway.parent.arp[source.ipAddress]=source.macAddress;


// this.receivePacket(
//   new DataPacket(
//   gateway,
//   source,
//   "Hello"
// ),"eth0",'hub1'," ");



//     }
//     // console.log(gateway.parent.arp);

//             }
            else{
              if(port.type==4 &&cross==1){
             
              


              }
              else if(port.type==4 && cross==0){
                console.log(port.name);
                port.parent.reciever(packet,"192.168.2.0");
              }
              else
              console.log("\x1b[31m","Rejected, doesn't match with the destination   ",'\x1b[0m')
            }


           
           
          }
           
          }
        });

        // console.log("Mactable",this.macTable)
      }
      console.log("Mactable",this.macTable);
    }
  }
  
  class Device {
    constructor(name, macAddress) {
      this.name = name;
      this.macAddress = macAddress;
      this.connected_devices=[]
    }
    connect(device,type){
      if(this.connected_devices.includes(device)==true){
        console.log("Devices already Connected");
        return;
      }
     
      this.connected_devices.push(device);
      if(type==0)
      device.connected_devices.push(this);
      console.log("Devices Connected");
    }
    
    
  
    send(data, destination) {
        const index = this.connected_devices.indexOf(destination);
        if (index == -1) {
           console.log("Devices not in Connection");
          
           return;
        }
     console.log(`${this.name} sending data to ${destination.name}`)
     destination.receive(data)
    }
  
    receive() {
        console.log(`${this.name} received data`)
  

    }
    disconnect(device){
        const index = this.connected_devices.indexOf(device);
if (index !== -1) {
    this.connected_devices.splice(index, 1);
}

const index1=device.connected_devices.indexOf(this);
if (index1 !== -1) {
    device.connected_devices.splice(index1, 1);
}
console.log("Connecttion Erased")
    }
    
  }
  class ReservationAccessControl {
    constructor(numSlots) {
      this.numSlots = numSlots;
      this.slots = Array(numSlots).fill(null);
    }
  
    requestAccess(device) {
      for (let i = 0; i < this.numSlots; i++) {
        if (this.slots[i] === null) {
          this.slots[i] = device;
       //   console.log("\x1b[31m","Rejected, doesn't match with the destination   ",'\x1b[0m')
          console.log('\x1b[32m',`${device.name} is granted access at time slot ${i}`,'\x1b[0m');
          return i;
        }
      }
      console.log("\x1b[31m",`${device.name} failed to get access`,'\x1b[0m');
      return -1;
    }
  
    releaseAccess(slot) {
      if (this.slots[slot] === null) {
        console.log(`Slot ${slot} is already empty`);
      } else {
        if(slot>=this.numSlots){
          console.log("Slot not in range")
          return;
        }
        const device = this.slots[slot];
        this.slots[slot] = null;
        console.log(`${device.name} released access at time slot ${slot}`);
      }
    }
  }
  class TokenRing {
    constructor(devices) {
      this.devices = devices;
      this.currentDeviceIndex = 0;
      this.token = null;
      this.isTokenPassing = false;
    }
  
    startTokenPassing() {
      if (this.isTokenPassing) {
        console.log("Token passing already in progress.");
        return;
      }
  
      this.isTokenPassing = true;
      this.token = new DataPacket(null, null, "token");
  for(let i=0;i<(this.devices).length-1;i++){
this.devices[i].connect(this.devices[i+1]);
  }
  this.devices[(this.devices.length)-1].connect(this.devices[0])
      console.log("Token passing started.");
  
      this.passToken();
    }
  
    stopTokenPassing() {
      this.isTokenPassing = false;
      this.token = null;
      console.log("Token passing stopped.");
    }
  
    passToken() {
      if (!this.isTokenPassing) {
        console.log("Token passing stopped.");
        return;
      }
  
      const currentDevice = this.devices[this.currentDeviceIndex];
      const nextDeviceIndex = (this.currentDeviceIndex + 1) % this.devices.length;
      const nextDevice = this.devices[nextDeviceIndex];
  
      if (currentDevice === nextDevice) {
        console.log("Only one device in the ring.");
        return;
      }
     
      console.log("\x1b[33m",`Passing token from ${currentDevice.name} to ${nextDevice.name}.`,'\x1b[0m');
  
      currentDevice.send(this.token, nextDevice);
  
      this.currentDeviceIndex = nextDeviceIndex;
  
      setTimeout(() => {
        this.passToken();
      }, 4000);

      
  
    }
  }

  

 
  
  

 

module.exports={
  Switch,
  Device,
  DataPacket,
  TokenRing,
  ReservationAccessControl
}



 

  
