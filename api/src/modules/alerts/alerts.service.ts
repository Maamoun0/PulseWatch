import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class AlertsService {
  private resend: Resend;

  constructor(private prisma: PrismaService) {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendDowntimeAlert(monitorId: string, error: string) {
    const monitor = await this.prisma.monitor.findUnique({
      where: { id: monitorId },
      include: { user: true },
    });

    if (!monitor) return;

    const alertConfigs = await this.prisma.alertConfiguration.findMany({
      where: { userId: monitor.userId, enabled: true, type: 'EMAIL' },
    });

    for (const config of alertConfigs) {
      await this.resend.emails.send({
        from: 'PulseWatch <alerts@pulsewatch.dev>',
        to: config.target,
        subject: `🚨 Monitor DOWN: ${monitor.name}`,
        html: `
          <h1>Monitor is Down</h1>
          <p><strong>Monitor:</strong> ${monitor.name}</p>
          <p><strong>URL/Token:</strong> ${monitor.url || monitor.token}</p>
          <p><strong>Error:</strong> ${error}</p>
          <hr />
          <p>We are currently analyzing the root cause with AI. Check your dashboard for updates.</p>
        `,
      });
    }
  }

  async sendRecoveryAlert(monitorId: string) {
    const monitor = await this.prisma.monitor.findUnique({
      where: { id: monitorId },
      include: { user: true },
    });

    if (!monitor) return;

    const alertConfigs = await this.prisma.alertConfiguration.findMany({
      where: { userId: monitor.userId, enabled: true, type: 'EMAIL' },
    });

    for (const config of alertConfigs) {
      await this.resend.emails.send({
        from: 'PulseWatch <alerts@pulsewatch.dev>',
        to: config.target,
        subject: `✅ Monitor RECOVERED: ${monitor.name}`,
        html: `
          <h1>Monitor is back Up</h1>
          <p><strong>Monitor:</strong> ${monitor.name}</p>
          <p><strong>URL/Token:</strong> ${monitor.url || monitor.token}</p>
          <p>Status transitioned back to UP.</p>
        `,
      });
    }
  }
}
