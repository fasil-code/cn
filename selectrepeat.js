const TOT_FRAMES = 500;
const FRAMES_SEND = 100;
let kkk=0;


let hh=2;

class SelectiveRepeat {
  constructor() {
    this.fr_send_at_instance = null;
    this.arr = new Array(TOT_FRAMES);
    this.send = new Array(FRAMES_SEND);
    this.rcvd = new Array(FRAMES_SEND);
    this.rcvd_ack = new Array(FRAMES_SEND);
    this.sw = null;
    this.rw = null;
  }

  input(n) {

   
    const m = Math.pow(2, n);
    let t = 0;
    this.fr_send_at_instance = m / 2;
    for (let i = 0; i < TOT_FRAMES; i++) {
      this.arr[i] = t;
      t = (t + 1) % m;
    }
    for (let i = 0; i < this.fr_send_at_instance; i++) {
      this.send[i] = this.arr[i];
      this.rcvd[i] = this.arr[i];
      this.rcvd_ack[i] = 'n';
    }
    this.rw = this.sw = this.fr_send_at_instance;
    this.sender(m);
  }

  sender(m) {
    for (let i = 0; i < this.fr_send_at_instance; i++) {
      if (this.rcvd_ack[i] === 'n') {
        console.log(`SENDER : Frame ${this.send[i]} is sent`);
      }
    }
    this.receiver(m);
  }

  receiver(m) {
    let t = new Date().getTime();
    let j;
    for (let i = 0; i < this.fr_send_at_instance; i++) {
      if (this.rcvd_ack[i] === 'n') {
        const f = Math.floor(Math.random() * 10);
        if (f !== 5) {
          for (let j = 0; j < this.fr_send_at_instance; j++) {
            if (this.rcvd[j] === this.send[i]) {
              
              console.log("\x1b[32m",`reciever:Frame ${this.rcvd[j]} recieved correctly`,'\x1b[0m');
              this.rcvd[j] = this.arr[this.rw];
              this.rw = (this.rw + 1) % m;
              break;
            }
          }
          let j;
          if (j === this.fr_send_at_instance) {
            console.log(`reciever:Duplicate frame ${this.send[i]} discarded`);
          }
          const a1 = Math.floor(Math.random() * 5);
          if (a1 === 3) {
            console.log("\x1b[33m",`(acknowledgement ${this.send[i]} lost)`,'\x1b[0m');
            console.log("\x1b[33m",'(sender timeouts-->Resend the frame)','\x1b[0m');
            this.rcvd_ack[i] = 'n';
          } else {
            console.log("\x1b[32m",`(acknowledgement ${this.send[i]} recieved)`,'\x1b[0m');
            this.rcvd_ack[i] = 'p';
          }
        } else {
          const ld = Math.floor(Math.random() * 2);
          if (ld === 0) {
            console.log("\x1b[31m",`Receiver Side : Frame ${this.send[i]} is damaged`,'\x1b[0m');
            console.log("\x1b[31m",`Receiver Side : Negative Acknowledgement ${this.send[i]} sent`,'\x1b[0m');
          } else {
            console.log("\x1b[31m",`@Frame Receiver Side : ${this.send[i]} is lost`,'\x1b[0m');
            console.log("\x1b[31m",'(Sender Timeout--------> please resend frame)','\x1b[0m');
          }
          this.rcvd_ack[i] = 'n';
        }
      }
    }
    for (let j = 0; j < this.fr_send_at_instance; j++) {
      if (this.rcvd_ack[j] === 'n') 
        break;
    }
      let i=0;
      for(let k=j;k<this.fr_send_at_instance;k++)
      {
      this.send[i]=this.send[k];
      if(this.rcvd_ack[k]=='n')
      this.rcvd_ack[i]='n';
      else
      this.rcvd_ack[i]='p';
      i++;
      }
      if(i!=this.fr_send_at_instance)
      {
      for(let k=i;k<this.fr_send_at_instance;k++)
      {
      this.send[k]=this.arr[this.sw];
      this.sw=(this.sw+1)%m;
      this.rcvd_ack[k]='n';
      }
      }
      let ch='n'
if(kkk<=1)ch='y'
kkk++;

if(ch=='y')
this.sender(m);
else
return
    
      
    

      }
    }

    module.exports=SelectiveRepeat