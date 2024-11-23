export function Controller(prefixRouter: string = '') {
    return (target: any) => {
        Reflect.defineMetadata('prefixRouter', prefixRouter, target)
    }
}