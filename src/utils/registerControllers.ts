import { Express } from 'express';
import { RouteHandler } from '../@types/route';

export function registerControllers(controllers: any[], app: Express) {
    controllers.forEach((ControllerClass) => {
        const controller = new ControllerClass();
        const prefixRouter = Reflect.getMetadata('prefixRouter', ControllerClass) as string || '';
        const routerHandlers = Reflect.getMetadata('routerHandlers', controller) as RouteHandler;

        if (!routerHandlers) return;

        Array.from(routerHandlers.entries()).forEach(([method, routes]) => {
            Array.from(routes.entries()).forEach(([route, handlers]) => {
                if (handlers) {
                    app[method as keyof Express](prefixRouter + route, handlers);
                }
            });
        });
    });
}