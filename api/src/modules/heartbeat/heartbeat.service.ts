import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class HeartbeatService {
  constructor(private prisma: PrismaService) {}

  async handlePing(token: string) {
    const monitor = await this.prisma.monitor.findUnique({
      where: { token, type: 'CRON' },
    });

    if (!monitor) {
      throw new NotFoundException('Invalid heartbeat token');
    }

    await this.prisma.monitorCheck.create({
      data: {
        monitorId: monitor.id,
        status: 'UP',
        checkedAt: new Date(),
      },
    });

    return this.prisma.monitor.update({
      where: { id: monitor.id },
      data: {
        status: 'UP',
        lastChecked: new Date(),
      },
    });
  }
}
