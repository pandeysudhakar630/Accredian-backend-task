let courses = [
    { id: 1, title: 'React Basics', description: 'Learn React', duration: '4 weeks' },
    { id: 2, title: 'Node.js Advanced', description: 'Master Node.js', duration: '6 weeks' }
];

const getCourses = (req, res) => res.json(courses);

const addCourse = (req, res) => {
    const course = { id: Date.now(), ...req.body };
    courses.push(course);
    res.status(201).json(course);
};

const updateCourse = (req, res) => {
    const { id } = req.params;
    const index = courses.findIndex(c => c.id == id);
    if (index !== -1) {
        courses[index] = { ...courses[index], ...req.body };
        res.json(courses[index]);
    } else {
        res.status(404).send('Course not found');
    }
};

const deleteCourse = (req, res) => {
    const { id } = req.params;
    courses = courses.filter(c => c.id != id);
    res.status(204).send();
};

module.exports = { getCourses, addCourse, updateCourse, deleteCourse };
