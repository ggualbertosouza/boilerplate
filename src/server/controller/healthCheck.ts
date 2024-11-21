import { inject, injectable } from 'inversify';
import { Controller } from '../../decorators/controller';
import { Request, Response } from 'express';
import { Route } from '../../decorators/route';
import HealthCheckService from '../../infra/service/health';
import HttpError from '../../infra/errors';

@Controller('/health')
class HealthCheckController {
    private healthCheckService: HealthCheckService;

    constructor(@inject(HealthCheckService) healthCheckService: HealthCheckService) {
        this.healthCheckService = healthCheckService;
    }

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
   @Route('get', '/resources')
   checkResources(req: Request, res: Response) {

    const memory = this.healthCheckService.memoryCheck();

    const result = {
        memory
    }

    return res.status(200).json({ status: 'ok', result }) 
   }
}

export default HealthCheckController;