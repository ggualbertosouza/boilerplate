import { Express, RequestHandler } from 'express';
import { RouteHandler } from '../@types/route';
import { METADA_KEY } from '../domain/constants/appConstants';

export function httpGet(path: string = '', ...middleware: RequestHandler[]) {
  return Route('get', path, ...middleware);
}

export function httpPost(path: string = '', ...middleware: RequestHandler[]) {
  return Route('post', path, ...middleware);
}

export function httpPut(path: string = '', ...middleware: RequestHandler[]) {
  return Route('put', path, ...middleware);
}

export function httpPatch(path: string = '', ...middleware: RequestHandler[]) {
  return Route('patch', path, ...middleware);
}

export function httpDelete(path: string = '', ...middleware: RequestHandler[]) {
  return Route('delete', path, ...middleware);
}

function Route(
  method: keyof Express,
  path: string = '',
  ...middleware: RequestHandler[]
) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const routerHandlers: RouteHandler =
      Reflect.getMetadata(METADA_KEY.controller, target) || new Map();

    const methodMap = routerHandlers.get(method) || new Map();

    methodMap.set(path, [...middleware, descriptor.value]);
    routerHandlers.set(method, methodMap);

    Reflect.defineMetadata(METADA_KEY.controller, routerHandlers, target);
  };
}
