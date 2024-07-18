const mongoose = require('mongoose');
const Tour = require('../../model/tourModel');
const users = require('../../model/userModel');
const reviews = require('../../model/reviewModel');
const fs = require('fs');
mongoose
  .connect(
    'mongodb+srv://krishnagokul1729:1ke3MoLgo6UqmxK8@app.m1lmn2d.mongodb.net/?retryWrites=true&w=majority&appName=app'
  )
  .then((con) => console.log('connected'))
  .catch((err) => console.log(err));
// const tour = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
// const user = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const review = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

// console.log(tour)
async function createTours() {
  try {
    // await Tour.create(tour);
    // await users.create(user);
    await reviews.create(review);
    console.log('datas created');
  } catch (err) {
    console.log(err);
  }
}
async function deleteTours() {
  try {
    // await Tour.deleteMany();
    // await users.deleteMany();
    await reviews.deleteMany();
    console.log('datas deleted');
  } catch (err) {
    console.log(err);
  }
}
if (process.argv[2] === '--import') {
  createTours();
} else if (process.argv[2] === '--delete') {
  deleteTours();
}
