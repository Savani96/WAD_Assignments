const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const StudentSchema = new mongoose.Schema({
    name: String,
    rollNumber: Number,
    marks: Number
});

const Student = mongoose.model('Student', StudentSchema);

// Create Student
app.post('/students', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.send(student);
});

// Get all Students
app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.send(students);
});

// Update Student
app.put('/students/:id', async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(student);
});

// Delete Student
app.delete('/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.send({ message: "Student deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
