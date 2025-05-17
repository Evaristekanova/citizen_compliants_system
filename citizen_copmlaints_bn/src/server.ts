import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import { AppDataSource } from "./database/data-source";
import userRoutes from "./routes/user.routes";
import statusRoutes from "./routes/status.routes";
import agencyRoutes from "./routes/agency.routes";
import categoryRoutes from "./routes/category.routes";
import { errorHandler } from "./middleswares/errorHandler.middleware";
import complaintRoutes from "./routes/complaint.routes";
import complaintsResponseRoutes from "./routes/complaintsResponse.routes";
import { UserController } from "./controllers/user.controller";

// Initialize the database connection
AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(
      cors({
        origin: "*",
      })
    );

    // JSON parser
    app.use(express.json());

    // Routes
    app.post("/auth/login", UserController.login);
    app.use("/users", userRoutes);
    app.use("/categories", categoryRoutes);
    app.use("/agencies", agencyRoutes);
    app.use("/statuses", statusRoutes);
    app.use("/complaints", complaintRoutes);
    app.use("/complaintsResponse", complaintsResponseRoutes);

    // Root route
    app.get("/", (_req: Request, res: Response) => {
      res.json("Established connection!");
    });

    // ✅ Apply error handler after all routes
    app.use(errorHandler);

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
