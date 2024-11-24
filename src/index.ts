import AppContainer from './config/container';
import Server from './server';
import logger from './utils/logger';

console.log = logger.log.bind(logger);
console.info = logger.info.bind(logger);
console.warn = logger.warn.bind(logger);
console.error = logger.error.bind(logger);

const container = await AppContainer.getInstance();
const server = container.get(Server);
await server.start();
server.listen();
