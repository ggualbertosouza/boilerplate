import 'reflect-metadata';
import http from 'node:http';
import { SERVER } from '../config';
import {  injectable } from 'inversify'
import express, { Express } from 'express';
import { loadModules } from '../utils/loadModules';
import { RouteHandler } from '../@types/route';
import { errorHandler } from './middlewares/errorHandler';
import AppContainer from '../config/container';
import { Container } from 'inversify';

@injectable()
class Server {
    private app: Express;
    private server: http.Server | null = null;

    constructor() {
        this.app = express();
    }

    public async start(): Promise<void> {
        this.app.use(express.json());

        this.registerControllers(await loadModules('src/server/controllers'));

        this.app.use(errorHandler);
        this.server = http.createServer(this.app);
    }

    public listen(): void {
        if (!this.server) return;

        this.server.listen(SERVER.PORT, () => {
            console.log(`Server running at: ${SERVER.HOSTNAME}:${SERVER.PORT}`)
        });
    }

    private closeServer(): void {
        if (this.server) this.server.close();
    }

    private async registerControllers(controllers: any[]) {
        const container = await AppContainer.getInstance();

        controllers.forEach((ControllerClass) => {
            const controller = container.get(ControllerClass) as any;
        
            const prefixRouter = Reflect.getMetadata('prefixRouter', ControllerClass) as string || '';
            const routerHandlers = Reflect.getMetadata('routerHandlers', controller) as RouteHandler;

            if (!routerHandlers) return;

            Array.from(routerHandlers.entries()).forEach(([method, routes]) => {
                Array.from(routes.entries()).forEach(([route, handlers]) => {
                    if (handlers) {
                        this.app[method as keyof Express](prefixRouter + route, handlers);
                    }
                });
            });
    });
}
}

export default Server;