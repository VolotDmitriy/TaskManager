import {Request, Response, NextFunction} from "express";
import logger from "../utils/logger";

export interface CustomError extends Error {
    status? : number;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${err.message}`);

    const status = err.status || 500;

    res.status(status).json({
        error: {
            message: err.message || "Internal Server Error",
            status,
        }
    })
}

export default errorHandler;