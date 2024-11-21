// import os from 'os';
import { injectable } from 'inversify';

@injectable()
class HealthCheckService {
    constructor() {}

    public memoryCheck() {
        // const totalMemory = os.totalmem();
        // const freeMemory = os.freemem();

        return 'asdf';
    }

    // public cpuCheck() {
    //     const cpus = os.cpus();

    //     const cpuUsage = cpus.map(cpu => {
    //         const times = cpu.times;
    //         const total = Object.values(times).reduce((acc, val) => acc + val, 0);
    //         const usage = ((total - times.idle) / total) * 100;
    //         return {
    //             model: cpu.model,
    //             usage: usage.toFixed(2)
    //         };
    //     });

    //     return cpuUsage;
    // }
}

export default HealthCheckService;