const axios = require('axios');

const green =  "\x1b[32m" ;
let number = 1639621508;
setInterval(async () => {
  try {
    number++;
    const url = `https://labapp.hypersoftmedia.com/public/file/tochi_${number}.php`;
    console.log('Requesting for ', number);
    const res = await axios.get(url);
    if (res.status == 200) {
        console.log('Success:', url);
    }
    if (res.data.includes('Reading')) {
        console.log(green, 'Found it:', url);
        console.log(res.data);
        process.exit(1);
    }
   
  } catch(err) {
    console.log(err.response.status);
  }
 
}, 2000);