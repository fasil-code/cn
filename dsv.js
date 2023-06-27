const readline = require('readline');

class Node {
    constructor(name, neighbors) {
      this.name = name;
      this.neighbors = neighbors;
      this.routingTable = new Map();
     
    }
    initializeRoutingTable(v) {
        this.routingTable.set(this.name, { distance: 0, nextHop: "-" });
    for (let neighbor of this.neighbors) {
        this.routingTable.set(neighbor[0].name, { distance: neighbor[1], nextHop: "-" });
    }
    for (let node of v) {
        if (node.name !== this.name && !this.routingTable.has(node.name)) {
            this.routingTable.set(node.name, { distance: Infinity, nextHop: "-" });
        }
    }


      
      }
  
      updateRoutingTable(neighbor) {
      const oldRoutingTable = new Map(neighbor[0].routingTable);
        
  oldRoutingTable.forEach(( destination,node) => {
    // console.log(node,destination.distance);
let dis=destination.distance+neighbor[1];
oldRoutingTable.set(node, { distance: dis, nextHop: neighbor[0].name });

  });
    
  oldRoutingTable.forEach((destination, node) => {
    if (this.routingTable.has(node)) {
      
    } 
    else {
      this.routingTable.set(node, { distance: destination.distance, nextHop: neighbor[0].name });
    }

  });


  const updatedRoutingTable= new Map();
  oldRoutingTable.forEach((destination, node) => {
let newRow=this.routingTable.get(node);
if(newRow.nextHop!==destination.nextHop){
if(newRow.distance<=destination.distance){
 updatedRoutingTable.set(node, { distance: newRow.distance, nextHop: newRow.nextHop });
}
else{
  
  updatedRoutingTable.set(node, { distance: destination.distance, nextHop: destination.nextHop });
}
}
else{
updatedRoutingTable.set(node, { distance: destination.distance, nextHop: destination.nextHop });
}
  });

 this.routingTable=updatedRoutingTable;
    }


    propagateRoutingTable() {
      for (const neighbor of this.neighbors) {
      
    this.updateRoutingTable(neighbor);
      }
    }
  
    isRoutingTableEqual(newRoutingTable) {
      if (this.routingTable.size !== newRoutingTable.size) return false;
  
      for (const [destination, { distance, nextHop }] of this.routingTable) {
        if (!newRoutingTable.has(destination) || newRoutingTable.get(destination).distance !== distance || newRoutingTable.get(destination).nextHop !== nextHop) {
          return false;
        }
      }
  
      return true;
    }
  
    printRoutingTable() {
      console.log(`Routing Table of Node ${this.name}:`);
      console.log("Destination\tDistance\tNext Hop");
  
      for (const [destination, { distance, nextHop }] of this.routingTable) {
        console.log(`${destination}\t\t${distance}\t\t${nextHop}`);
      }
    }
  }
  function rip(){
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
  r1 = rl.question("Enter the number of nodes: ", (num) => {
 let n=parseInt(num);
 // array of node
  let vector=[];
for(let i=0;i<n;i++){
  const value=String.fromCharCode(i+65);
  vector[i]=new Node(value,[]);
 
}


function saveMatrix(n) {
  let matrix = [];
  console.log(`Enter the ${n} x ${n} matrix:`);

  rl.on('line', (input) => {
    const row = input.split(' ').map(Number);
    matrix.push(row);

    if (matrix.length === n) {
   
      console.log('Matrix saved:');
      console.log(matrix);
      for (let i=0;i<n ;i++) {
        for(let j=0;j<n;j++){
          if (matrix[i][j]>=0){
            vector[i].neighbors.push([vector[j],matrix[i][j]]);
          }
        }
        }
      
        for (let node of vector) {
    node.initializeRoutingTable(vector);
}


for(let node of vector){
  node.propagateRoutingTable();
}
for (let node of vector) {
    node.printRoutingTable();
}





    }
  });
};


saveMatrix(n);


  });
  }

module.exports = rip;