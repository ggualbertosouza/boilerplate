import { METADA_KEY } from '../domain/constants/appConstants';

export function Controller(prefixRouter: string = '') {
  return (target: any) => {
    Reflect.defineMetadata(METADA_KEY.router, prefixRouter, target);
  };
}
