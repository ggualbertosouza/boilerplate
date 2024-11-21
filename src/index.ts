import AppContainer from "./config/container";
import Server from "./server";

const container = await new AppContainer().getInstance();
const server = container.get(Server);
await server.start();
server.listen();