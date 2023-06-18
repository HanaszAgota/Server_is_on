const express = require('express');

const app = express();

// Root endpoint
app.get('/', (req, res) => {
  const html = '<h1>Hello World! It\'s Codecool</h1>';
  res.send(html);
});

// Get all students
app.get('/api/students', (req, res) => {
  const students = loadStudents();
  res.json(students);
});

// Get student by ID
app.get('/api/students/:id', (req, res) => {
  const students = loadStudents();
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

// Get students by status (active or finished)
app.get('/api/status/:status', (req, res) => {
  const students = loadStudents();
  const status = req.params.status === 'active';
  const filteredStudents = students.filter(s => s.status === status);
  res.json(filteredStudents);
});

// Add a new student
app.post('/api/students', (req, res) => {
  const students = loadStudents();
  const { name } = req.body;
  const newStudent = {
    id: students.length + 1,
    name,
    status: true
  };
  students.push(newStudent);
  saveStudents(students);
  res.json(newStudent);
});

// Load students from file
function loadStudents() {
  try {
    const studentsData = fs.readFileSync(studentsFilePath, 'utf8');
    return JSON.parse(studentsData);
  } catch (error) {
    console.error('Error loading students:', error);
    return [];
  }
}

// Save students to file
function saveStudents(students) {
  try {
    fs.writeFileSync(studentsFilePath, JSON.stringify(students));
  } catch (error) {
    console.error('Error saving students:', error);
  }
}

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
