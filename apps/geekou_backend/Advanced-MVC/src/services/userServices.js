import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class UserServices {
  constructor(db) {
    this.db = db;
  }

  // Validate fields
  async registerUser(email, password) {
    try {
      // Validate fields
      if (!email || !password) {
        return { message: "All fields are required", status: "error" };
      }

      if (!validator.isEmail(email)) {
        return { message: "Invalid email format", status: "error" };
      }

      if (password.length < 6) {
        return {
          message: "Password must be at least 6 characters long",
          status: "error",
        };
      }
      
      const existingUsers = await this.db.query(
        "SELECT * FROM Administrator WHERE email = ?",
        [email]
      );
      console.log(existingUsers,'ex');
      
      if (existingUsers?.length > 0) {
        return { message: "Email is already registered", status: "error" };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = "INSERT IGNORE INTO Administrator (email, password) VALUES (?, ?)";
      console.log("Executing SQL with params:", sql, [email, hashedPassword]);
      await this.db.query(
        sql,
        [email, hashedPassword],
        (err, results) => {
          if (err) {
            console.error('Error inserting data:', err);
          } else {
            console.log('Data inserted successfully:', results);
          }
          connection.end();
        }
      );

      return { message: "User registered successfully", status: "success" };
    } catch (err) {
      console.error("Error in registerUser:", err);
      return {
        message: "Error registering user",
        status: "error",
        error: err.message || "Unknown error occurred"
      };
    }
  }

  async loginUser(role, email, password) {
    // Validate fields
    if (!email || !password) {
      return { message: "Email and password are required", status: "error" };
    }

    try {
      let query = "";

      // Determine the query based on the role
      if (role === "admin") {
        query = "SELECT * FROM Administrator WHERE email = ?";
      } else if (role === "institute") {
        query = "SELECT * FROM institute_table WHERE email = ?";
      } else if (role === "student") {
        query = "SELECT * FROM students_tables WHERE email = ?";
      } else {
        return { message: "Invalid role", status: "error" };
      }

      // Execute the query
      const [existingUser] = await this.db.query(query, [email]);

      if (existingUser.length === 0) {
        return { message: "User not found", status: "error" };
      }

      // Verify password
      const match = await bcrypt.compare(password, existingUser[0].password);
      if (!match) {
        return { message: "Invalid credentials", status: "error" };
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: existingUser[0].id, email: existingUser[0].email, role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return { message: "Login successful", status: "success", token };
    } catch (error) {
      console.error("Error during login:", error);
      return { message: "An error occurred during login", status: "error" };
    }
  }
}

export default UserServices;
