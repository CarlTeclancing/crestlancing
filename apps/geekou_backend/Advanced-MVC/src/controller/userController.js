import UserServices from "../services/userServices.js";
import db from "../services/database.js";

const userServices = new UserServices(db); // Instantiate the service

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await userServices.registerUser(email, password);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { role, email, password } = req.body;
  try {
    const result = await userServices.loginUser(role, email, password);
    res.status(200).json(result); // Use 200 for successful login
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};