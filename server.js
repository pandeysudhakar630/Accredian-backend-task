const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let courses = [
  { id: 1, title: 'React Basics', description: 'Learn React', duration: '4 weeks' },
  { id: 2, title: 'Node.js Advanced', description: 'Master Node.js', duration: '6 weeks' }
];

// Get all courses
app.get('/courses', (req, res) => {
  res.status(200).json(courses);
});

// Get a single course by ID
app.get('/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  res.status(200).json(course);
});

// Add a new course
app.post('/courses', (req, res) => {
  const { title, description, duration } = req.body;

  if (!title || !description || !duration) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newCourse = { id: Date.now(), title, description, duration };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// Update a course
app.put('/courses/:id', (req, res) => {
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
app.delete('/courses/:id', (req, res) => {
  const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));

  if (courseIndex === -1) {
    return res.status(404).json({ message: 'Course not found' });
  }

  courses.splice(courseIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
