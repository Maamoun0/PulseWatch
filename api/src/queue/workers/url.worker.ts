import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import axios from 'axios';
import { PrismaService } from '../../common/prisma.service';
import { MonitorsService } from '../../modules/monitors/monitors.service';

@Processor('monitor-checks')
export class URLWorker extends WorkerHost {
  constructor(
    private prisma: PrismaService,
    private monitorsService: MonitorsService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { monitorId, url, expectedStatus, timeout } = job.data;

    const start = Date.now();
    try {
      const response = await axios.get(url, { timeout: timeout * 1000 });
      const responseTime = Date.now() - start;

      const isUp = response.status === expectedStatus;

      await this.prisma.monitorCheck.create({
        data: {
          monitorId,
          status: isUp ? 'UP' : 'DOWN',
          statusCode: response.status,
          responseTime,
          checkedAt: new Date(),
        },
      });

      await this.monitorsService.handleCheckResult(monitorId, isUp ? 'UP' : 'DOWN');
    } catch (error) {
      const responseTime = Date.now() - start;
      await this.prisma.monitorCheck.create({
        data: {
          monitorId,
          status: 'DOWN',
          statusCode: error.response?.status,
          errorMessage: error.message,
          responseTime,
          checkedAt: new Date(),
        },
      });

      await this.monitorsService.handleCheckResult(monitorId, 'DOWN', error.message);
    }
  }
}
