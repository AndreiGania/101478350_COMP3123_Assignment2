const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// CREATE EMPLOYEE
router.post('/employees', async (req, res, next) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (err) {
    next(err);
  }
});

// GET ALL EMPLOYEES
router.get('/employees', async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
});

// GET EMPLOYEE BY ID
router.get('/employees/:id', async (req, res, next) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(emp);
  } catch (err) {
    next(err);
  }
});

// UPDATE EMPLOYEE BY ID
router.put('/employees/:id', async (req, res, next) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee updated', updated });
  } catch (err) {
    next(err);
  }
});

// DELETE EMPLOYEE BY ID
router.delete('/employees/:id', async (req, res, next) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee deleted' });
  } catch (err) {
    next(err);
  }
});

// SEARCH EMPLOYEES (department or name)
router.get('/search', async (req, res, next) => {
  try {
    const { name, department } = req.query;
    const filter = {};

    if (name) filter.$or = [
      { first_name: new RegExp(name, 'i') },
      { last_name: new RegExp(name, 'i') }
    ];

    if (department) filter.department = new RegExp(department, 'i');

    const results = await Employee.find(filter);
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});

// UPLOAD PHOTO
router.post("/employees/upload/:id", upload.single("photo"), async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      { photo: req.file.filename },
      { new: true }
    );

    res.json({ message: "Photo uploaded", employee: updated });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;
