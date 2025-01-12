// src/utils/logger.ts
import winston, { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Tell winston about our colors
winston.addColors(colors);

// Create the format for console output
const consoleFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.colorize({ all: true }),
  format.printf(
    (info) => `${info.timestamp} ${info.level}: ${formatMessage(info.message)}`
  )
);

// Create the format for file output (without colors)
const fileFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(
    (info) => `${info.timestamp} ${info.level}: ${formatMessage(info.message)}`
  )
);

// Helper function to format message objects
function formatMessage(message: any): string {
  if (typeof message === 'object') {
    // Handle Error objects specially
    if (message instanceof Error) {
      return `${message.message}\nStack: ${message.stack}`;
    }
    // Handle other objects
    return JSON.stringify(message, null, 2);
  }
  return message;
}

// Define the log directory
const logDir = path.join(process.cwd(), 'logs');

// Create the logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels,
  format: format.combine(
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    // Console transport
    new winston.transports.Console({
      format: consoleFormat
    }),
    
    // Rotating file transport for all logs
    new DailyRotateFile({
      dirname: logDir,
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      format: fileFormat
    }),
    
    // Separate file for error logs
    new DailyRotateFile({
      dirname: logDir,
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
      format: fileFormat
    })
  ],
  // Don't exit on error
  exitOnError: false
});

// Create a stream object for Morgan HTTP logging
export const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

// Export helper functions for commonly used log patterns
export const logError = (error: Error, context?: object) => {
  logger.error({
    message: error.message,
    stack: error.stack,
    ...context
  });
};

export const logAPIRequest = (req: any, context?: object) => {
  logger.info({
    type: 'API_REQUEST',
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body,
    ip: req.ip,
    userAgent: req.get('user-agent'),
    ...context
  });
};

export const logAPIResponse = (req: any, res: any, responseTime: number, context?: object) => {
  logger.info({
    type: 'API_RESPONSE',
    method: req.method,
    path: req.path,
    statusCode: res.statusCode,
    responseTime,
    ...context
  });
};

// Usage examples:
/*
logger.error('This is an error message');
logger.warn('This is a warning message');
logger.info('This is an info message');
logger.http('This is an HTTP message');
logger.debug('This is a debug message');

logError(new Error('Database connection failed'), {
  database: 'users',
  connectionId: '123'
});

logAPIRequest(req, { userId: '123' });
logAPIResponse(req, res, 123, { userId: '123' });
*/