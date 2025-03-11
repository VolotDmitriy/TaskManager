import {Request, Response, NextFunction} from "express";
import {CustomError} from "./errorHandler";
import logger from "../utils/logger";


const validateNewTask = (req: Request, res: Response, next: NextFunction): void => {
    const { title, completed } = req.body;

    if (typeof title !== 'string' || title === ""){
        const error: CustomError = new Error ("Title is required and must be non-empty sting");
        error.status = 400;
        logger.error(`title error in validator for new task, ${error.message}`);
        return next(error);
    }

    if (completed !== undefined && typeof completed !== 'boolean'){
        const error: CustomError = new Error("Completed must be a boolean");
        error.status = 400;
        logger.error(`completed error in validator for new task, ${error.message}`);
        return next(error);
    }

    next();
}
export default validateNewTask;