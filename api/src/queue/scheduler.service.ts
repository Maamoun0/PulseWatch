import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class SchedulerService implements OnModuleInit {
  constructor(
    @InjectQueue('monitor-checks') private checkQueue: Queue,
    private prisma: PrismaService,
  ) {}

  async onModuleInit() {
    // Basic interval to schedule checks. In a real app, this would be more sophisticated.
    setInterval(() => this.scheduleChecks(), 30000); // Every 30s
  }

  async scheduleChecks() {
    const monitors = await this.prisma.monitor.findMany({
      where: {
        type: 'URL',
        status: { not: 'PAUSED' },
      },
    });

    for (const monitor of monitors) {
      await this.checkQueue.add(
        'check',
        {
          monitorId: monitor.id,
          url: monitor.url,
          expectedStatus: monitor.expectedStatus,
          timeout: monitor.timeout,
        },
        { jobId: `check-${monitor.id}-${Date.now()}` },
      );
    }

    await this.checkQueue.add('check-cron', {}, { jobId: `cron-sync-${Date.now()}` });
  }
}
