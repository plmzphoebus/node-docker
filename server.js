'use strict';

const express = require('express');

// Constants
const PORT = 3002;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send(`Hello world This is node on docker environment=${process.env.NODE_ENV} custom_variable_Name=${process.env.NAME}`);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);