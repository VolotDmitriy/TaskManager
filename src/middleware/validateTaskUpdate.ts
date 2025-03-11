import {Request, Response, NextFunction} from "express";
import {CustomError} from "./errorHandler";
import logger from "../utils/logger";


const validateTaskUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { title, completed } = req.body;

    if (title !== undefined && (typeof  title !== 'string' || title === "")){
        const error: CustomError = new Error("Title is required and must be non-empty sting");
        error.status = 400;
        logger.error(`title error in validator for update task, ${error.message}`);
        return next(error);
    }

    if (completed !== undefined && (typeof completed !== 'boolean')) {
        const error: CustomError = new Error("Completed must be boolean");
        error.status = 400;
        logger.error(`completed error in validator for update task, ${error.message}`);
        return next(error);
    }

    next();
}

export default validateTaskUpdate;