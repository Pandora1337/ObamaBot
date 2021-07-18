const { createLogger, format, transports, addColors } = require('winston');
const myCustomLevels = {
  levels: {
    error: 0,
    server: 1,
    info: 2,
    exec: 3
  },
  colors: {
    error: 'red',
    server: 'bold magenta',
    exec: 'green'
  }
}

addColors(myCustomLevels.colors);

module.exports = createLogger({
  levels: myCustomLevels.levels,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.printf(log => `[${log.level.toUpperCase()}] [${log.timestamp}]: ${log.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'exec',
      format: format.combine(
        format.colorize(),
        format.printf(log => `[${log.level}]: ${log.message}`)
      )
    }),

    new transports.File({ filename: 'logs/logy.log', level: 'exec'}),
    new transports.File({ filename: 'logs/errors.log', level: 'error'})
  ]
});