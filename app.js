
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 4000;
app.use(bodyParser.json());

const emailRoutes = require('./routes/email');
app.use('/send-email', emailRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});