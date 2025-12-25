require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('./models/Student');
const data = require('./data/students.json');

(async function seed(){
  if (!process.env.MONGO_URI) { console.error('MONGO_URI not set'); process.exit(1); }
  await mongoose.connect(process.env.MONGO_URI);
  await Student.deleteMany({});
  await Student.insertMany(data);
  console.log('Seeded students'); process.exit(0);
})();
