//import express
const express = require('express');

//create an instance of new server using express
const app = express();

app.use('/test',(req, res) => {
    res.send('Hello TEst from DevTinder!');
});
app.use('/',(req, res) => {
    res.send('Hello Home from DevTinder!');
});
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
