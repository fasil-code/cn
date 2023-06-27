const readline = require("readline");
const staticRouting = require("./default");
const r=require('./router')
const sr=require('./sr')
const run=r.run;
const Router=staticRouting.Router;
const Interf=staticRouting.Interf;
const DataPacket = staticRouting.DataPacket;
const DataLink = require("./DataLink");
const Switch = DataLink.Switch;
const rip=require('./dsv')
const ospf=require('./lsp')
const createDevices=require('./gendevices')
const SelectiveRepeat = require("./selectrepeat");
const physical = require("./Physical");



function askQuestion() {
  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
 let question = `
        1. Press 1 to exit
        2. Press 2 for static routing
        3.press 3 for arp protocol transmission
        4.press 4 for rip
        5.press 5 for osp
        6. press 6 for segment selective repeat.
        `;
        r1.question(question, function (answer) {
            if (answer === "1") {
                r1.close();
            } else if (answer === "2") {
                const router1 = new Router("router1");
                const router2 = new Router("router2");
                const switch1 = new Switch("switch1");
                const switch2 = new Switch("switch2");
                const devices = createDevices(4);
                devices[0].ipAddress = "192.168.1.2";
                devices[1].ipAddress = "192.168.1.3"
                devices[2].ipAddress = "192.168.2.2";
                devices[3].ipAddress = "192.168.2.3";
                
                const a1=new Interf("eth0", "192.168.1.4","a:b:c",router1);
                const a2=new Interf("eth1", "192.168.3.2","d:e:f",router1);
                
                const b1=new Interf("eth2", "192.168.2.4","a:b:c:d",router2);
                const b2=new Interf("eth3", "192.168.3.3","d:e:f:g",router2);
                
                router1.addInterface(a1);
                router1.addInterface(a2);
                
                router2.addInterface(b1);
                router2.addInterface(b2);
                
                switch1.connect(devices[0]);
                switch1.connect(devices[1]);
                
                switch2.connect(devices[2]);
                switch2.connect(devices[3]);
                
                a1.connected(switch1);
                b1.connected(switch2);
                
                switch1.connect(a1);
                switch2.connect(b1);
                
                // configuring devices
                
                devices[0].default_gateway="192.168.1.4";
                devices[1].default_gateway="192.168.1.4";
                devices[2].default_gateway="192.168.2.4";
                devices[3].default_gateway="192.168.2.4";
                
                
                // configuring routers
                
                router1.static.push(["192.168.2.0",router2]);
                router2.static.push(["192.168.1.0",router1]);
                
                const packet = new DataPacket(devices[0], devices[1], "Hello");
                let  s=false;
                
                if(packet.destinationMac==devices[1]){
                  s=true;
                }
                // if(s==true){
                // console.log("Destination is present in same network");
                // switch1.receivePacket(packet,"port0","hub","",s);
                
                // }
                
                
                
                
                
                s=false;
                const packet1 = new DataPacket(devices[0], devices[2], "Hello");
                switch1.receivePacket(packet1,"port0","hub","",s);

            }

            else if(answer==="3"){
                
                
                run();
            

            }
            else if(answer=='4'){
    r1.close();
          
rip();
            }

            else if(answer=='5'){
              r1.close();
          
              ospf();
            }
            else if(answer=='6'){
          
          
             const s=new sr();
             s.input(4);
            }

        })

}
askQuestion();