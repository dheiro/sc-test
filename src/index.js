const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/', routes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
