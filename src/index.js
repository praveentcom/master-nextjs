const fs = require('fs');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const log4js = require('log4js');

const app = express();
const port = (process.argv[2] === 'prod') ? 3000 : 3001;

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
    console.log('IPaaS APIs are up and running on port - ' + port + '.');
});