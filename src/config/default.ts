import dotenv from "dotenv";
dotenv.config();

const config = {
    PORT: process.env.PORT || 3000,
    log: {
        level: "info", // Уровень логирования по умолчанию
        appenders: {
            console: { type: "console" }, // Логи в консоль
            file: { type: "file", filename: "logs/app.log" }, // Логи в файл
        },
        categories: {
            default: { appenders: ["console", "file"], level: "info" }, // Консоль и файл
        },
    },
}

export default config;