
const physical=require("./Physical")
const Device=physical.Device
const Hub=physical.Hub

const createDevices=require('./gendevices')

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
function askQuestion() {
    let question = `
      1. Press 1 to exit 
      2. Press 2 to connect 2 end Devices
      3. Press 3 to connect Hub and end Devices.
      
        `;
    rl.question(question, function(answer) {
      if (answer === '1') {
        rl.close();
      } else if (answer === '2') {
        const devices = createDevices(2);
        
        devices[0].connect(devices[1],0);
        devices[1].connect(devices[0],0);
        // console.log(devices);
        devices[0].send('1001001', devices[1],0);
        askQuestion(); 
      } else if (answer === '3') {
        let n=5;
        rl.question(`     Enter the number of end devices \n
          `,function(answer){
         n=answer
         const devices = createDevices(n);
        const hub = new Hub('Hub')
      
        for(dev in devices) {
            let device = devices[dev];
          
          
          hub.connect(device,0);
          device.connect(hub,1)
        }
        console.log("MAIN HUB IS \n");
        console.log(hub );
        console.log('\n\n\n');
        console.log("ALL END DEVICES ARE LISTED BELOW \n");
console.log(devices);
console.log('\n\n\n');



      rl.question("Enter the devices to communicate ",function(answer){
        let first=answer.split(" ")[0]-1;
        let second=answer.split(" ")[1]-1;
       
        hub.send_data('1001001',devices[first],devices[second])
        rl.close()
      })
     
        
        })
        
     askQuestion(); 
      }
      
      
      
      else {



        console.log('Invalid input. Please try again.');
        askQuestion(); 
      }
    });
  }


askQuestion()
