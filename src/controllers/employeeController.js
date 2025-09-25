import Employee from "../models/Employee.js";
import Login from "../models/Login.js";

export const createEmployee = async (req, res, next) => {
  try {
    const { name, age, dob, city, departmentId } = req.body;
    const emp = new Employee({
      name,
      age,
      dob,
      city,
      department: departmentId || undefined,
    });
    await emp.save();
    res.status(201).json(emp);
  } catch (error) {
    next(error);
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    const employee = await Employee.find()
      .populate("department")
      .populate("login");
    res.json(employee);
  } catch (error) {
    next(error);
  }
};

// Create both employee + login in one request (optional convenience)
export const registerEmployeeWithLogin = async (req, res) => {
  try {
    const { username, password, employeeId } = req.body;

    // 1. Check employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // 2. Create login record (model pre-save hook will hash password)
    const login = new Login({
      username,
      password,
      employee: employeeId,
    });

    await login.save();

    // 4. Link login to employee
    employee.login = login._id;
    await employee.save();

    res.status(201).json({ message: "Login created successfully", login });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
