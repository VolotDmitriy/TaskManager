import log4js from "log4js";
import config from "../config/default";

log4js.configure({
    appenders: config.log.appenders,
    categories: config.log.categories,
});

const logger = log4js.getLogger();

export default logger;
