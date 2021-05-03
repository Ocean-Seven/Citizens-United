// Libraries + dependencies
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const router = require('./router.js');
const bodyparser = require('body-parser');
const port = 3000;

// Initialize express server + apply middleware
const server = express()
  .use(morgan('dev'))
  .use(express.json())
  .use(cors())
  .use(bodyparser.urlencoded({ extended: true }))
  .use('/api', router)
  .use(express.static(path.join(__dirname, '../client/dist/')))

// Connect to router
server.listen(port, () => console.log(`Listening on port: ${port}`));
