import express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "./database/data-source";
import userRoutes from "./routes/user.routes"

// Initialize the database connection
AppDataSource.initialize()
  .then(() => {
    // Create Express application
    const app = express();

    // Middleware for parsing JSON request bodies
    app.use(express.json());
    
    // CUSTOM ROUTES
    app.use("/users", userRoutes);

    // Root route
    app.get("/", (_req: Request, res: Response) => {
      res.json("Established connection!");
    });

    // Start server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
