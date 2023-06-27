const DataLink = require("./DataLink");
const SelectiveRepeat = require("./selectrepeat");
const physical = require("./Physical");
const hub = physical.Hub;
const stopandwait = require("./stopwait");
const Switch = DataLink.Switch;
const Device = DataLink.Device;
const DataPacket = DataLink.DataPacket;
const TokenRing = DataLink.TokenRing;
const ReservationAccessControl = DataLink.ReservationAccessControl;
const createDevices = require("./gendevices");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion() {
  let question = `
      1. Press 1 to exit 
      2. Press 2 to connect Switch and end Devices (Address Learning).
      3. Press 3 for demonstration of Token Acesss Control Protocol
      4. Press 4 for demonstration of Reservation Access Control Protocol
      5. Press 5 to use stop and wait arq flow acess protocol.
      6. Press 6 to use selective repeat flow acess protocol.
      7. Press 7 to connect 2 Hub's and 10 end Devices.
    `;
  rl.question(question, function (answer) {
    if (answer === "1") {
      rl.close();
    } else if (answer === "2") {
      rl.question(
        `Enter the number of end devices 
`,
        function (answer) {
          n = answer;
          const devices = createDevices(n);
          const switch1 = new Switch("Switch");
          for (dev in devices) {
            let device = devices[dev];

            switch1.connect(device);

            device.connect(switch1, 2);
          }
          console.log(switch1);
          
          function cons() {
            rl.question(
              `
    1.press 1 to exit
    2.press 2 for the devices to communicate
      `,
              function (answer) {
                if (answer === "1") {
                  rl.close();
                } else {
                  rl.question(
                    `Enter the device no. to communicate  `,
                    function (answer) {
                      let first = answer.split(" ")[0] - 1;
                      let second = answer.split(" ")[1] - 1;

                      switch1.receivePacket(
                        new DataPacket(
                          devices[first],
                          devices[second],
                          "Hello"
                        ),

                        "port" +first
                      );

                      cons();
                    }
                  );
                }
              }
            );
          }
          cons();
        }
      );
    } else if (answer == `3`) {
      console.log( "\x1b[34m","Starting Token Access Ring Protocol Protocol",'\x1b[0m');
      rl.question(
        `Enter the number of end devices 
`,
        function (answer) {
          const devices = createDevices(answer);
          const switch1 = new Switch("Switch");
          for (dev in devices) {
            let device = devices[dev];
    
            switch1.connect(device);
    
            device.connect(switch1,2);
          }
          const tokenRing = new TokenRing(
            
          devices
          );
         tokenRing.startTokenPassing();
        })
      
    } else if (answer === `4`) {

      console.log( "\x1b[34m","Starting Reservation Control Acesss Protocol\n",'\x1b[0m');

      rl.question(
        `Enter the number of end devices 
`,
        function (answer) {
          let n=answer
          let m=4;
          const request1 = new ReservationAccessControl(m);
          const devices = createDevices(n);
          const switch1 = new Switch("Switch");
          for (dev in devices) {

            let device = devices[dev];
    
            switch1.connect(device);
    
            device.connect(switch1);
          }
          for (let i = 0; i < n; i++) {
            let r=request1.requestAccess(devices[i]);
            setTimeout(() => {
              if(r==-1){
                
                request1.requestAccess(devices[i]);
              }
              else
              request1.releaseAccess(i);
            }, 3000);
          }



        })




    } 
    
    else if (answer == "5") {
      console.log( "\x1b[34m","Stop and wait  Flow Control Protocol \n",'\x1b[0m');
      
      stopandwait();
    } else if (answer === "6") {
      console.log( "\x1b[34m","Select Repeat Flow Control Protocol \n",'\x1b[0m');
      
      let mySelRepeat = new SelectiveRepeat();
      rl.question(`Enter the no. of sequence bits  `, function (answer) {
        mySelRepeat.input(answer);
        askQuestion();
      });
    } else if (answer == "7") {
      const devices1 = createDevices(10);

      const hub1 = new hub("hub1");
      const hub2 = new hub("hub2");
      const switch1 = new Switch("Switch");
      // Connections
      for (let i = 0; i < devices1.length / 2; i++) {
        hub1.connect(devices1[i], 0);
        devices1[i].connect(hub1,1);
      }
      for (let i = 5; i < devices1.length; i++) {
        hub2.connect(devices1[i], 0);
        devices1[i].connect(hub2,1);
      }


      switch1.connect(hub1);
      hub1.connect(switch1, 2);
     
      switch1.connect(hub2);
      hub2.connect(switch1, 2);
// Data part
  // Same side
  
  function cons() {
    rl.question(
      `
1.press 1 to exit
2.press 2 for the devices to communicate
`,

      function (answer) {
        if (answer === "1") {
          rl.close();
        } else {
          rl.question(
            `Enter the device no. to communicate(1-10)  `,
            function (answer) {
              function sameSide(a,b){
               
                
                let f=false,f1=false;
                
                for(let dev=0;dev<hub1.connected_devices_id.length;dev++){
                 
                  if(hub1.connected_devices_id[dev].deviceId.macAddress==a.macAddress){
                   
                    
                  f=true;
                  
                }

            if(hub1.connected_devices_id[dev].deviceId.macAddress==b.macAddress ){
                  f1=true;
                }
                
               
               }
if(f1 && f)return true;
f=false,f1=false;
for(let dev=0;dev<hub2.connected_devices_id.length;dev++){
 
   if(hub2.connected_devices_id[dev].deviceId.macAddress==a.macAddress){
    
     
   f=true;
   
 }

if(hub2.connected_devices_id[dev].deviceId.macAddress==b.macAddress ){
   f1=true;
 }
 

}
if(f1 && f)return true;
               return false;
              }
              let first = answer.split(" ")[0] - 1;
              let second = answer.split(" ")[1] - 1;
              let sourceHub=null;
                if(first<5){
                  sourceHub=hub1;
                  
                }
                else{
sourceHub=hub2;
                }
              if(sameSide(devices1[first],devices1[second])){
                console.log("same devices");
          
             sourceHub.send_data("10001",devices1[first],devices1[second],"send");
               
              }
              else{
                console.log("Cross Different devices");
                sourceHub.send_data("10001",devices1[first],devices1[second],"send");
              

              }




           

              cons();
            }
          );
        }
      }
    );
  }

cons();
     
    } else {
      console.log("Invalid input. Please try again.");
      askQuestion();
    }
  });
}
askQuestion();
