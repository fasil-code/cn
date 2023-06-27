// HTTP Client implementation using axios
const axios = require('axios');

async function makeHttpRequest(url, method, body) {
  try {
    const response = await axios({
      url: url,
      method: method,
      data: body
    });
    return response.data;
  } catch (error) {
    throw new Error('Request failed');
  }
}

const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=1139ea3c4cb87cbe515f3f3b59568adc';
const method = 'GET';

makeHttpRequest(url, method, null)
  .then(response => {
    console.log('Weather:', response);
  })
  .catch(error => {
    console.log('Error occurred:', error);
  });

