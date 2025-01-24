import express, {Application} from "express";
import router from "./routes";
import taskRoutes from "./routes/tasks"

const app: Application = express();

app.use(express.json()); // Middleware для работы с JSON
app.use("/", router);

app.use("/tasks", taskRoutes)
export default app;
