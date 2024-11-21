import { Container } from 'inversify';
import Server from '../server';
import 'reflect-metadata';
import HealthCheckController from '../server/controller/healthCheck';

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
        this.container.bind(HealthCheckController).to(HealthCheckController).inSingletonScope();
    }
}

export default AppContainer;