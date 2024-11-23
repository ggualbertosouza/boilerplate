import { Container } from 'inversify';
import Server from '../server';
import HealthCheckService from '../infra/service/health';
import HealthCheckController from '../server/controllers/healthCheck';
import 'reflect-metadata';

class AppContainer {
    private static instance: Container;

    public static async getInstance(): Promise<Container> {
        if (!AppContainer.instance) {
            const container = new Container();

            AppContainer.setup(container);

            AppContainer.instance = container;
        };
        return AppContainer.instance;
    }

    private static setup(container: Container): void {
        container.bind<Server>(Server).to(Server).inSingletonScope();
    
        container.bind<HealthCheckController>(HealthCheckController).to(HealthCheckController).inSingletonScope();
        container.bind<HealthCheckService>(HealthCheckService).to(HealthCheckService).inSingletonScope();
    }
}

export default AppContainer;