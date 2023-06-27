const readline = require('readline');

const PriorityQueue  = require('js-priority-queue');
class Node {
    constructor(name, neighbors) {
         this.name = name;
         this.neighbors = neighbors;
         this.routingTable = new Map();
         this.distance=[];
        this.all=[]
        
       }
        

       lsp() {
        let distances = {};
        for (let node of this.all) {
          distances[node.name] = Infinity;
        }

        // Stores the reference to previous nodes
        let prev = {};
        var queue = new PriorityQueue();
     
       queue.queue({node:[this],dis:0});
       distances[this.name] = 0;
       while(queue.length>0){
        let current=queue.dequeue();
        let dis=current.dis;
        //console.log(current.node,current.dis);
        for(let neighbor of current.node[0].neighbors){
            let alt=dis+neighbor[1];
            if(alt<distances[neighbor[0].name]){
                distances[neighbor[0].name]=alt;
                prev[neighbor[0].name]=current.node[0].name;
                queue.queue({node:[neighbor[0]],dis:alt});
            }

        }
       


       }
       
        this.distance=distances;
       // console.log(prev);
        // make routing table
        this.routingTable.set(this.name, { distance: 0, nextHop: "-" });
        for (let neighbor of this.neighbors) {
            this.routingTable.set(neighbor[0].name, { distance: this.distance[neighbor[0].name], nextHop: "-" });
        }

        for (let node of this.all) {
        
            if (node.name !== this.name && !this.routingTable.has(node.name)) {
                let next=node.name
                while(!this.routingTable.has(next)){
             next=prev[next];
              }
                this.routingTable.set(node.name, { distance: this.distance[node.name], nextHop: next });
            }

        }

     
       
      }

      
       printRoutingTable() {
        console.log(`Routing Table of Node ${this.name}:`);
        console.log("Destination\tDistance\tNext Hop");
    
        for (const [destination, { distance, nextHop }] of this.routingTable) {
          console.log(`${destination}\t\t${distance}\t\t${nextHop}`);
        }
      }

   };
   
// const A = new Node("A", []);
//   const B = new Node("B", []);
//   const C = new Node("C", []);
//   const D = new Node("D", []);
//   const E = new Node("E", []);
//   vector=[A,B,C,D,E];

//   // console.log(A.routingTable)
//   // Set neighbors for each node
//   A.neighbors = [[B,5], [C,2], [D,3]];//[B, C, D];

//   B.neighbors = [[A,5], [C,4], [E,3]];//[A, C,E];
//   C.neighbors = [[A,2], [E,4],[B,4]];
//   D.neighbors = [[A,3]];
//   E.neighbors = [[B,3], [C,4]];

//  0 5 2 3 -1
//  5 0 4 -1 3
//  2 4 0 -1 4
//  3 -1 -1 0 -1
//  -1 3 4 -1 0

//    for (let node of vector) {
//     node.lsp();
   
//    }

//     for (let node of vector) {
//         node.printRoutingTable();

//     }

  function osfp(){
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
       for (let node of vector) {
    node.all=vector;
   
   
   }
       for (let i=0;i<n ;i++) {
         for(let j=0;j<n;j++){
           if (matrix[i][j]>=0){
             vector[i].neighbors.push([vector[j],matrix[i][j]]);
           }
         }
         }
       

 
 
 for(let node of vector){
   node.lsp();
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
  module.exports=osfp;