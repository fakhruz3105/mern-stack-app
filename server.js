const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const errorHandler = require('./middleware/ErrorHandler');
require('dotenv').config();

//Route
const items = require('./route/api/items');

const app = express();

//BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('common'));
app.use(helmet());

app.use(cors());

//Connect to db
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

//Use route
app.use('/api/items', items);

//Serve static asset if in production
if(process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(errorHandler.notFound);

app.use(errorHandler.generalError);

//PORT config
const PORT = process.env.PORT || 5000;

//Run server
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
