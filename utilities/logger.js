const { createLogger, format, transports } = require("winston");
const DailyRotate = require("winston-daily-rotate-file");

const logDirectory = "log";

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf(
            (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`
        )
    ),
    transports: [
        new DailyRotate({
            filename: `${logDirectory}/%DATE%-API.log`,
            datePattern: "YYYY-MM-DD",
        }),
        new transports.Console({
            levels: "info",
            format: format.combine(
                format.colorize(),
                format.printf(
                    (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`
                )
            ),
            prettyPrint: true,
        }),
    ],
    exitOnError: false,
});

const formateErrorStack = (key, value) => {
    if (value instanceof Error) {
        let error = {};

        Object.getOwnPropertyNames(value).forEach((newKey) => {
            error[newKey] = value[newKey];
        });
        return error;
    }
    return value;
};

const logError = (err) => {
    logger.error(JSON.stringify(err, formateErrorStack));
};

module.exports = { logger, logError };
