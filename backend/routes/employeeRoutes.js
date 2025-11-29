const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

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

module.exports = router;
