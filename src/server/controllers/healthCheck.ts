import { inject, injectable } from 'inversify';
import { Controller } from '../../decorators/controller';
import { Request, Response } from 'express';
import { Route } from '../../decorators/route';
import HealthCheckService from '../../infra/service/health';
import AppContainer from '../../config/container';

@injectable()
@Controller('/health')
class HealthCheckController {
    private healthCheckService: HealthCheckService;

    constructor(@inject(HealthCheckService) healthCheckService: HealthCheckService) {
        this.healthCheckService = healthCheckService;
    }

    @Route('get')
    checkApp(req: Request, res: Response) {
        return res.status(200).json({ status: 'ok', message: 'Don´t be worried, the application is working!' })
    }

    @Route('get', '/db')
    checkDatabase(req: Request, res: Response) {
        return res.status(200).json({ status: 'ok', message: 'Db' })
    }

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