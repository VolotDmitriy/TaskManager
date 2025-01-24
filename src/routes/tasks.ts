import {Router, Request, Response} from "express";

const router = Router();

interface taskInterface {
    id: number;
    title: string;
    completed: boolean;
}

type RouterHandler = (req: Request, res: Response) => void;


let tasks: taskInterface[] = [];
const addNewTask: RouterHandler = (req, res) => {
    const {title} = req.body;

    if (!title) return res.status(400).json({error: "Title is necessary"});

    const newTask = {
        id: tasks.length + 1,
        title,
        completed: false,
    }

    tasks.push(newTask);
    res.status(201).json(newTask);
}

const getAllTasks: RouterHandler = (req, res) =>{
    res.json(tasks);
}


router.post("/", addNewTask);
router.get("/", getAllTasks);

export default router;