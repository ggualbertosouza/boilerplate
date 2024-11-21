import 'reflect-metadata';
import http from 'node:http';
import { SERVER } from '../config';
import {  injectable } from 'inversify'
import express, { Express } from 'express';
import { loadModules } from '../utils/loadModules';
import { registerControllers } from '../utils/registerControllers';

@injectable()
class Server {
    private app: Express;
    private server: http.Server | null = null;

    constructor() {
        this.app = express();
    }

    public async start(): Promise<void> {
        this.app.use(express.json());
            
        const controllers = await loadModules('src/server/controller')
        registerControllers(controllers, this.app)

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
}

export default Server;