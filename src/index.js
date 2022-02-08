const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const apiRoute = require('./routes');
const documentationRoute = require('./routes/documentation');
require('dotenv').config();

const app = express();

mongoose.connect(`mongodb://${process.env.EXPRESS_MONGODB_URL}/SejutaCitaTest`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin',
  auth: {
    username: process.env.EXPRESS_MONGODB_USER,
    password: process.env.EXPRESS_MONGODB_PASSWORD,
  }
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('connected to database'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api', apiRoute);
app.use('/documentation', documentationRoute);

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`server running on port ${process.env.EXPRESS_PORT}`);
});
