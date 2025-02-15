import express from "express";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";
import routes from "./src/routes/userRoutes.js";
import { checkConnection } from "./src/config/db.js";

// dotenv.config();

const app = express();

app.use(express.json()); //middleware to parse json bodies

app.use('/api/users', userRoutes); //use user routes for api calls

app.listen(3000, async()=>{
  console.log('server runningon port 3000');

  try {
    await checkConnection();
  } catch (error) {
    console.log('failed to initialize DB', error);
  }
});

// const port = process.env.PORT || 3000;

// dbInstance.initConnection();

// app.use(express.static("uploads"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json()); // req.body

// // console.log(routes);
// app.use("/api", routes);

// // Global Error Handling Middleware
// app.use((req, res, next) => {
//   console.error("Global Error");
//   res.status(500).json({
//     status: "error",
//     message: "Internal Server Error",
//   });
// });

// // Fallback for undefined routes
// app.use((req, res) => {
//   res.status(404).json({
//     status: "fail",
//     message: "Route not found",
//   });
// });

// async function runMigrations() {
//   const migration = new Migration(dbInstance);
//   try {
//     await migration.createDatabaseAndTables();
//     console.log("All migrations completed successfully.");
//   } catch (error) {
//     console.error("Migration failed:", error);
//   }
// }

// // Automatically run migrations once when the server starts
// runMigrations().then(() => {
//   app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}/`);
//   });
// });

