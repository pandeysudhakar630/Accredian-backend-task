const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

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

// Dummy course data
let courses = [
  { id: 1, title: 'React Basics', description: 'Learn React', duration: '4 weeks' },
  { id: 2, title: 'Node.js Advanced', description: 'Master Node.js', duration: '6 weeks' }
];

// Get all courses
app.get('/api/courses', (req, res) => {
  res.status(200).json(courses);
});

// Get a single course by ID
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  res.status(200).json(course);
});

// Add a new course
app.post('/api/courses', (req, res) => {
  const { title, description, duration } = req.body;

  if (!title || !description || !duration) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newCourse = { id: Date.now(), title, description, duration };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// Update a course
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

  res.status(200).json(course);
});

// Delete a course
app.delete('/api/courses/:id', (req, res) => {
  const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));

  if (courseIndex === -1) {
    return res.status(404).json({ message: 'Course not found' });
  }

  courses.splice(courseIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
