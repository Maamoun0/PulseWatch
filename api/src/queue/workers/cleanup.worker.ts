import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../../common/prisma.service';

@Processor('monitor-checks')
export class CleanupWorker extends WorkerHost {
  constructor(private prisma: PrismaService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    if (job.name !== 'cleanup-logs') return;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await this.prisma.monitorCheck.deleteMany({
      where: {
        checkedAt: { lt: thirtyDaysAgo },
      },
    });

    console.log(`Cleaned up ${result.count} old monitor checks.`);
  }
}
