import express, {Application} from "express";
import router from "./routes";
import taskRoutes from "./routes/tasks"
import errorHandler from "./middleware/errorHandler";

const app: Application = express();

app.use(express.json()); // Middleware для работы с JSON
app.use("/", router);


app.use(errorHandler);
app.use("/tasks", taskRoutes)
export default app;
