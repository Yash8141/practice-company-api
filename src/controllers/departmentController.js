import Department from "../models/Department.js";

export const createDepartment = async (req, res, next) => {
  try {
    const dept = new Department({
      name: req.body.name,
      description: req.body.description,
    });
    await dept.save();
    res.status(201).json(dept);
  } catch (error) {
    next(err);
  }
};

export const listDepartment = async (req, res, next) => {
  try {
    const dept = await Department.find();
    res.json(dept);
  } catch (error) {
    next(error);
  }
};