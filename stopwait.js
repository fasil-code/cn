class Timer {
    constructor() {
      this.begTime = 0;
    }
  
    start() {
      this.begTime = Date.now();
    }
  
    elapsedTime() {
      return Math.floor((Date.now() - this.begTime) / 1000);
    }
  
    isTimeout(seconds) {
      return seconds >= this.elapsedTime();
    }
  }
function stopandwait(){

   
  const frames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const seconds = 5;
  
  console.log("Sender has to send frames: " + frames.join(" "));
  
  let count = 0;
  let delay = false;
  
  console.log("\nSender\t\t\t\t\tReceiver");
  
  do {
    let timeout = false;
  
    process.stdout.write("Sending Frame : " + frames[count]);
    process.stdout.write("\t\t");
  
    const t = new Timer();
    t.start();
  
    if (Math.floor(Math.random() * 2)) {
      const to = 24600 + Math.floor(Math.random() * (640000 - 24600) + 1);
      for (let i = 0; i < 64000; i++) {
        for (let j = 0; j < to; j++) {}
      }
    }

    if (t.elapsedTime() <= seconds) {
      process.stdout.write("Received Frame : " + frames[count] + " ");
      if (delay) {
        process.stdout.write("Duplicate");
        delay = false;
      }
      process.stdout.write("\n");
      count++;
    } else {
      console.log("---");
      console.log("\x1b[31m","TimeOut",'\x1b[0m')
      timeout = true;
    }
  
    t.start();
  
    if (Math.floor(Math.random() * 2) || !timeout) {
      const to = 24600 + Math.floor(Math.random() * (64000 - 24600) + 1);
      for (let i = 0; i < 64000; i++) {
        for (let j = 0; j < to; j++) {}
      }
      if (t.elapsedTime() > seconds) {
        console.log("Delayed Ack");
        count--;
        delay = true;
      } else if (!timeout) {
       
        console.log("\x1b[32m","Acknowledgement : " + (frames[count] - 1),'\x1b[0m');
      }
    }
  } while (count !== 10);
}
module.exports=stopandwait