import { Router, Request, Response } from "express";
import logger from "../utils/logger";
import validateNewTask from "../middleware/validateTask";
import validateTaskUpdate from "../middleware/validateTaskUpdate";

const router = Router();
interface taskInterface {
    id: number;
    title: string;
    completed: boolean;
}

type RouterHandler = (req: Request, res: Response) => void;

let tasks: taskInterface[] = [];

const getAllTasks: RouterHandler = (req, res) => {
    logger.info(`GET /tasks - Получение всех задач`);
    res.status(200).json(tasks);
};

const addNewTask: RouterHandler = (req, res) => {
    logger.info(`POST /tasks - Создание новой задачи: ${JSON.stringify(req.body)}`);

    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is necessary" });

    const newTask = {
        id: tasks.length + 1,
        title,
        completed: false,
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
};

const updateTask: RouterHandler = (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    logger.info(`PUT /tasks/${id} - Обновление задачи: ${JSON.stringify(req.body)}`);

    const taskId = parseInt(id);
    if (isNaN(taskId)) {
        return res.status(400).json({ error: "Invalid task ID" });
    }

    const task = tasks.find((e) => e.id === taskId);
    if (!task) return res.status(404).json({ error: "Task not found!" });

    const updates: Partial<taskInterface> = {};
    if (title !== undefined) updates.title = title;
    if (completed !== undefined) updates.completed = completed;

    Object.assign(task, updates);
    res.status(200).json(task);
};

const deleteTask: RouterHandler = (req, res) => {
    const { id } = req.params;

    logger.info(`DELETE /tasks/${id} - Удаление задачи`);

    const taskIndex = tasks.findIndex((e) => e.id === parseInt(id));
    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    const [deletedTask] = tasks.splice(taskIndex, 1);
    res.status(200).json({ message: "Task deleted", task: deletedTask });
};

router.post("/", validateNewTask, addNewTask);
router.get("/", getAllTasks);
router.put("/:id", validateTaskUpdate, updateTask);
router.delete("/:id", deleteTask);

// Сделал post запрос title + completed и completed не засчитало
// Странный ответ при обновлении значения которого нету :
// {
// 	"error": {
// 		"message": "Unexpected token } in JSON at position 20",
// 		"status": 400
// 	}
// }

export default router;
