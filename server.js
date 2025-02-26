const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');  // To persist data (if needed)

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration to allow requests from your frontend
app.use(cors({
  origin: 'https://accredian-frontend-task-tau-three.vercel.app', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(bodyParser.json());

// Dummy course data - You can replace this with a database or persistent file
let courses = [
  { id: 1, title: 'React Basics', description: 'Learn React', duration: '4 weeks' },
  { id: 2, title: 'Node.js Advanced', description: 'Master Node.js', duration: '6 weeks' },
  { id: 3, title: 'HTML', description: 'From basic to advanced level', duration: '2 weeks' }
];

// GET: All courses
app.get('/api/courses', (req, res) => {
  res.status(200).json(courses);
});

// GET: A single course by ID
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  res.status(200).json(course);
});

// POST: Add a new course
app.post('/api/courses', (req, res) => {
  const { title, description, duration } = req.body;

  if (!title || !description || !duration) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newCourse = { id: Date.now(), title, description, duration };
  courses.push(newCourse);

  // Optionally, save the data to a file to persist between server restarts
  fs.writeFileSync('courses.json', JSON.stringify(courses));  // Saving data to a file

  res.status(201).json(newCourse);
});

// PUT: Update a course
app.put('/api/courses/:id', (req, res) => {
  const { title, description, duration } = req.body;
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  if (!title || !description || !duration) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  course.title = title;
  course.description = description;
  course.duration = duration;

  // Optionally, save the updated data to a file to persist between server restarts
  fs.writeFileSync('courses.json', JSON.stringify(courses));  // Saving updated data to a file

  res.status(200).json(course);
});

// DELETE: Delete a course
app.delete('/api/courses/:id', (req, res) => {
  const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));

  if (courseIndex === -1) {
    return res.status(404).json({ message: 'Course not found' });
  }

  courses.splice(courseIndex, 1);

  // Optionally, save the updated data to a file after deleting
  fs.writeFileSync('courses.json', JSON.stringify(courses));  // Saving updated data to a file

  res.status(204).send();
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

