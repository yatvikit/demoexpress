const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());
mongoose.connect(process.env.uri )
  .then(() =>{ console.log("MongoDB connected")
    const PORT = process.env.port || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
  })
  .catch(err => console.error(err));

  const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema);
app.post("/employees", async (req, res) => {
  try {
    const emp = new Employee(req.body);
    const savedEmp = await emp.save();
    res.status(201).json(savedEmp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📖 READ All Employees
app.get("/employees", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// 📖 READ Employee by ID
app.get("/employees/:id", async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(emp);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

