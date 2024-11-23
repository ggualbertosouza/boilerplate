import { inject, injectable } from 'inversify';
import { Controller } from '../../decorators/controller';
import { Request, Response } from 'express';
import { Route } from '../../decorators/route';
import HealthCheckService from '../../infra/service/health';
import AppContainer from '../../config/container';

@injectable()
@Controller('/health')
class HealthCheckController {
    constructor() {}

    @Route('get')
    checkApp(req: Request, res: Response) {
        return res.status(200).json({ status: 'ok', message: 'Application is working!' })
    }

    @Route('get', '/db')
    checkDatabase(req: Request, res: Response) {
        return res.status(200).json({ status: 'ok', message: 'Db' })
    }

    @Route('get', '/resources')
    async checkResources(req: Request, res: Response) {
        const healthCheckService = (await AppContainer.getInstance()).get(HealthCheckService);
        const result = {
            memory: healthCheckService.memoryCheck(),
            cpu: healthCheckService.cpuCheck()
        }

        return res.status(200).json(result) 
   }
}

export default HealthCheckController;