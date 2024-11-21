import { Container } from 'inversify';
import Server from '../server';
import HealthCheckService from '../infra/service/health';
import 'reflect-metadata';

class AppContainer {
    private container: Container;

    constructor() {
        this.container = new Container();
        this.setup();
    }

    public async getInstance(): Promise<Container> {
        if (!this.container) return new Container;

        return this.container;
    }

    private setup() {
        this.container.bind(Server).to(Server).inSingletonScope();

        this.container.bind(HealthCheckService).to(HealthCheckService).inSingletonScope();
    }
}

export default AppContainer;