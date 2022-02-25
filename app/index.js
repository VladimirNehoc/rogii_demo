const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.static(`${__dirname}/static`));

app.get('/script.js', (req, res) => {
  res.sendFile(`${__dirname}/public${req.originalUrl}`);
});

app.get('/*.js', (req, res) => {
  res.sendFile(`${__dirname}${req.originalUrl}`);
});

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(process.env.PORT, process.env.HOST);

console.log(`running on http://${process.env.HOST}:${process.env.PORT}`);
