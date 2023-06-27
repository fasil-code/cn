const readline = require("readline");
const makeHttpRequest = require('./http.js');
const sendEmail = require('./email.js');
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function askQuestion() {
let question = `
1. press 1 to exit
2. press 2 smtp protocol
3. press 3 for http protocol
`
r1.question(question, function (answer) {

if (answer === '1') {
  rl.close();
}
else if (answer === '2') {
  console.log('Sending email...')
  sendEmail('zargerfasil123@gmail.com', 'Hello', 'This is a test email.');
  
}
else if (answer === '3') {
console.log('Sending http request...')
// Example usage=eathermap.org/data/2.5/weather?q=London\&appid=1139ea3c4cb87cbe515f3f3b59568adc';
// Example usage

const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=1139ea3c4cb87cbe515f3f3b59568adc';

const method = 'GET';



makeHttpRequest(url, method, null)
  .then(response => {
    console.log('Response:', response);
  })
  .catch(error => {
    console.log('Error occurred:', error.message);
    makeHttpRequest(url, method, null)
  });
}
})
}

askQuestion();