import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../../common/prisma.service';

@Processor('monitor-checks')
export class CronWorker extends WorkerHost {
  constructor(private prisma: PrismaService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    if (job.name !== 'check-cron') return;

    const monitors = await this.prisma.monitor.findMany({
      where: {
        type: 'CRON',
        status: { not: 'PAUSED' },
      },
    });

    const now = new Date();

    for (const monitor of monitors) {
      const gracePeriod = monitor.interval * 1000; // in ms
      const lastCheck = monitor.lastChecked ? new Date(monitor.lastChecked).getTime() : 0;
      
      if (now.getTime() - lastCheck > gracePeriod) {
        // Heartbeat missed
        await this.prisma.monitor.update({
          where: { id: monitor.id },
          data: { status: 'DOWN' },
        });

        await this.prisma.monitorCheck.create({
          data: {
            monitorId: monitor.id,
            status: 'DOWN',
            errorMessage: 'Heartbeat missed',
            checkedAt: now,
          },
        });
      }
    }
  }
}
