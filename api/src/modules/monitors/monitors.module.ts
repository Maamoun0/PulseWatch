import { Module } from '@nestjs/common';
import { MonitorsService } from './monitors.service';
import { MonitorsController } from './monitors.controller';
import { PrismaService } from '../../common/prisma.service';

@Module({
  providers: [MonitorsService, PrismaService],
  controllers: [MonitorsController],
  exports: [MonitorsService],
})
export class MonitorsModule {}
