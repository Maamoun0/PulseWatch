import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { URLWorker } from './workers/url.worker';
import { CronWorker } from './workers/cron.worker';
import { SchedulerService } from './scheduler.service';
import { PrismaService } from '../common/prisma.service';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'monitor-checks',
    }),
  ],
  providers: [URLWorker, CronWorker, SchedulerService, PrismaService],
  exports: [BullModule],
})
export class QueueModule {}
