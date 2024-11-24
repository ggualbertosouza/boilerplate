import { injectable } from 'inversify';
import { Controller } from '../../decorators/controller';
import { Request, Response } from 'express';
import { httpGet } from '../../decorators/route';
import HealthCheckService from '../../infra/service/health';
import AppContainer from '../../config/container';
import { StatusCodes } from '../../domain/constants/httpConstants';

@injectable()
@Controller('/health')
class HealthCheckController {
    @httpGet()
    checkApp(req: Request, res: Response) {
        return res.status(StatusCodes.OK).json({ status: 'ok', message: 'Application is working!' })
    }

    @httpGet('/db')
    checkDatabase(req: Request, res: Response) {
        return res.status(StatusCodes.OK).json({ status: 'ok', message: 'Db' })
    }

    @httpGet('/resources')
    async checkResources(req: Request, res: Response) {
        const healthCheckService = (await AppContainer.getInstance()).get(HealthCheckService);

        const result = {
            memory: healthCheckService.memoryCheck(),
            cpu: healthCheckService.cpuCheck()
        }

        return res.status(StatusCodes.OK).json(result) 
   }
}

export default HealthCheckController;