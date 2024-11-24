import 'reflect-metadata';
import http from 'node:http';
import { NODE_ENV, SERVER } from '../config';
import { inject, injectable } from 'inversify';
import express, { Express, NextFunction, Request, Response } from 'express';
import { loadModules } from '../library/loadModules';
import { RouteHandler } from '../library/route';
import { errorHandler } from './middlewares/errorHandler';
import AppContainer from '../config/container';
import { METADA_KEY } from '../domain/constants/appConstants';
import DatabaseConnection from '../config/db';
import cors from 'cors';

@injectable()
class Server {
  private app: Express;
  private server: http.Server | null = null;
  private databaseConnection: DatabaseConnection;

  constructor(
    @inject(DatabaseConnection) databaseConnection: DatabaseConnection,
  ) {
    this.app = express();
    this.databaseConnection = databaseConnection;
  }

  public async start(): Promise<void> {
    this.app.use(express.json());
    this.setupCors();

    this.databaseConnection.connect();

    this.registerControllers(await loadModules('src/server/controllers'));

    this.app.use(errorHandler);
    this.server = http.createServer(this.app);
  }

  public listen(): void {
    if (!this.server) return;

    this.server.listen(SERVER.PORT, () => {
      console.info(`Server running at: ${SERVER.HOSTNAME}:${SERVER.PORT}`);
    });
  }

  private closeServer(): void {
    if (this.server) this.server.close();
  }

  private async registerControllers(controllers: any[]) {
    const container = await AppContainer.getInstance();

    controllers.forEach((ControllerClass) => {
      const controller = container.get(ControllerClass) as any;

      const prefixRouter =
        (Reflect.getMetadata(METADA_KEY.router, ControllerClass) as string) ||
        '';
      const routerHandlers = Reflect.getMetadata(
        METADA_KEY.controller,
        controller,
      ) as RouteHandler;

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

  private setupCors() {
    // Domínios permitidos - Prod
    const allowedProdOrigins = [''];

    // Domínios permitidos - Dev
    const allowedDevOrigins = [
      `http://${SERVER.HOSTNAME}:${SERVER.PORT}`,
      `http://127.0.0.1:${SERVER.PORT}`,
    ];

    this.app.use(
      cors({
        origin: (origin: string | undefined, callback: Function) => {
          if (
            NODE_ENV === 'development' &&
            (!origin || allowedDevOrigins.includes(origin))
          ) {
            return callback(null, true);
          }

          if (
            NODE_ENV === 'production' &&
            origin &&
            allowedProdOrigins.includes(origin)
          ) {
            return callback(null, true);
          }

          callback(new Error('Not allowed by CORS'));
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: [
          'Origin',
          'X-Requested-With',
          'Content-Type',
          'Accept',
          'Authorization',
        ],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
      }),
    );

    this.app.options('*', (req: Request, res: Response, next: NextFunction) => {
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      );
      res.status(204).send('');
    });
  }
}

export default Server;
