const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');
const port = process.env.PORT || '8000';

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@app.m1lmn2d.mongodb.net/?retryWrites=true&w=majority&appName=app`
  )
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));

// server
app.listen(port, () => {
  console.log('listening');
});
