// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [marks, setMarks] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/students/${editId}`, { name, rollNumber, marks });
    } else {
      await axios.post("http://localhost:5000/students", { name, rollNumber, marks });
    }
    setName("");
    setRollNumber("");
    setMarks("");
    setEditId(null);
    fetchStudents();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    fetchStudents();
  };

  const handleEdit = (student) => {
    setName(student.name);
    setRollNumber(student.rollNumber);
    setMarks(student.marks);
    setEditId(student._id);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Student Management</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Roll Number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required />
        <input type="number" placeholder="Marks" value={marks} onChange={(e) => setMarks(e.target.value)} required />
        <button type="submit">{editId ? "Update" : "Add"} Student</button>
      </form>
      <table border="1" style={{ margin: "20px auto", width: "50%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Marks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.rollNumber}</td>
              <td>{student.marks}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

