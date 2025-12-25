require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const corsOptions = 
{ origin:"https://student-report-6g09.onrender.com", 
   methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true, };
app.use(cors(corsOptions));
app.use(express.json());

const useDb = (process.env.USE_DB || 'false').toLowerCase() === 'true';

if (useDb) {
  // optional: use MongoDB (MERN)
  const mongoose = require('mongoose');
  const Student = require('./models/Student');
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongo connected'))
    .catch(err => console.error('Mongo connect err', err));

  app.get('/api/students', async (req, res) => {
    const students = await Student.find().select('name overall');
    res.json(students);
  });

  app.get('/api/students/:id', async (req, res) => {
    const s = await Student.findById(req.params.id);
    if (!s) return res.status(404).json({ message: 'Not found' });
    res.json(s);
  });

} else {
  // JSON mode (default) - no DB required
  const data = require('./data/students.json'); // file from step 1

  app.get('/api/students', (req, res) => {
    const list = data.map((s, idx) => ({ id: idx.toString(), name: s.name, overall: s.overall }));
    res.json(list);
  });

  app.get('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id < 0 || id >= data.length) return res.status(404).json({ message: 'Not found' });
    res.json(data[id]);
  });
}

app.get('/', (req, res) => res.send('Student report API running'));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
