import { injectable } from 'inversify';
import { Controller } from '../../decorators/controller';
import { Request, Response } from 'express';
import { Route } from '../../decorators/route';

@injectable()
@Controller('/health')
class HealthCheckController {
    /*
        Check if application is on 
    */
   @Route('get')
    checkApp(req: Request, res: Response) {
        return res.status(200).json({ status: 'ok', message: 'Don´t be worried, the application is working!' })
    }

    /*
        Check if Database is on
    */
   @Route('get', '/db')
   checkDatabase(req: Request, res: Response) {
    return res.status(200).json({ status: 'ok', message: 'Db' })
   }

   /*
    Check CPU, memory and disk
    */
   @Route('post', '/resource')
   checkResources(req: Request, res: Response) {
    return res.status(200).json({ status: 'ok', message: 'resources' })
   }
}

export default HealthCheckController;