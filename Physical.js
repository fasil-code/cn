
//Physical Link Layer

class Device {
    constructor(name, macAddress,ip) {
      this.name = name;
      this.macAddress = macAddress;
      this.ipAddress=ip;
      this.arp_table={};
      this.default_gateway=null;
      this.connected_devices=[]
    }
    connect(device,type){
      if(this.connected_devices.includes(device)==true){
        console.log("Devices already Connected");
        return;
      }
     
      this.connected_devices.push({device,type});
      if(type==0){
       
        console.log("Connected "+this.name+" to "+device.name)
      }
     else if(type==1){
      console.log(this.name +" is connected to "+device.name);
     }
     else if(type==2){
      console.log(this.name +" is connected to "+device.name);
     }

    }
    
    
  
    send(data, destination,type) {
     
      const isConnected = this.connected_devices.some(({ device }) => device.macAddress === destination.macAddress);
        if (!isConnected) {
           console.log("Devices not in Connection");
           return;
        }
     console.log(`${this.name} sending data to ${destination.name}`)
     destination.receive(data)
    }
  
    receive() {
        console.log("\x1b[32m",`${this.name} received data \n`,'\x1b[0m')
        
  

    }
    recieve(packet){
      console.log(packet);
      console.log("\x1b[32m",`${this.name} received data \n`,'\x1b[0m')
 

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

  class DataPacket {
    constructor(sourceMac, destinationMac, data) {
      this.sourceMac = sourceMac;
      this.destinationMac = destinationMac;
      this.data = data;
    }
  }

 class Hub{
    constructor(hubId){
        this.hubId=hubId;
        this.name=hubId;
        this.type=1;
        this.connected_devices_id=[]
    }

    connect(deviceId,type){
      if(this.connected_devices_id.includes({deviceId,type})==true){
        console.log("Devices already Connected in network");
        return;
      }
        this.connected_devices_id.push({deviceId,type});
        if(type==0)
        console.log("--- Connected "+this.hubId+ " to device "+deviceId.name+" as a endDevice----");
        else if(type==2) console.log("Connected to device "+deviceId.name+" as a switch")
    }
    send_data(data, source,destination,op) {
      let temp= source.name[source.name.length-1]-1;
   

      for (let i = 0; i < this.connected_devices_id.length; i++) {
     
        if (this.connected_devices_id[i].deviceId.name!=source.name) {
        
          console.log(`${source.name} sending data to ${this.connected_devices_id[i].deviceId.name} via Hub`);
         if(this.connected_devices_id[i].type==2  && op=="send"){
  
      this.connected_devices_id[i].deviceId.receivePacket(
        new DataPacket(
          source,
          destination,
          "Hello"
        ),                        
        "port"+temp,this 
      );
    
         }
          if(this.connected_devices_id[i].deviceId.macAddress==destination.macAddress && this.connected_devices_id[i].type==0 ){
            destination.receive(data);
          }
          else{
            console.log("\x1b[31m","Rejected, doesn't match with the destination   ",'\x1b[0m')
          }

        }
      }
      console.log("\x1b[33m",'Data Broadcasted to all connected end devices by  : '+this.name, data,'\x1b[0m');
  }
  
      receive_data() {
        console.log('Data received from device ' );
      }
}




module.exports={Device,Hub}


