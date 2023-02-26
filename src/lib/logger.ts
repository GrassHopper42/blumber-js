type LoggerOptions = {
  [key: string]: any;
};
const envToLogger: LoggerOptions = {
  development: {
    target: 'pino-pretty',
    options: {
      levelFirst: true,
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname',
    },
  },
  production: true,
  test: false,
};

const environment = process.env.NODE_ENV || 'development';

export const logger = envToLogger[environment] ?? true;
