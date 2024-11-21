import { Express, RequestHandler } from 'express';
import { RouteHandler } from '../@types/route';

export function Route(method: keyof Express, path: string = '', ...middleware: RequestHandler[]) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const routerHandlers: RouteHandler = Reflect.getMetadata('routerHandlers', target) || new Map();

        const methodMap = routerHandlers.get(method) || new Map();

        methodMap.set(path, [...middleware, descriptor.value]);
        routerHandlers.set(method, methodMap);

        Reflect.defineMetadata('routerHandlers', routerHandlers, target);
    }
}