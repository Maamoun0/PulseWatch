import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { AIService } from '../ai/ai.service';
import { AlertsService } from '../alerts/alerts.service';
import { MonitorType } from '@prisma/client';

@Injectable()
export class MonitorsService {
  constructor(
    private prisma: PrismaService,
    private aiService: AIService,
    private alertsService: AlertsService,
  ) {}

  async create(userId: string, data: any) {
    return this.prisma.monitor.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.monitor.findMany({
      where: { userId },
      include: {
        _count: {
          select: { checks: true },
        },
      },
    });
  }

  async findOne(userId: string, id: string) {
    const monitor = await this.prisma.monitor.findUnique({
      where: { id },
      include: {
        checks: {
          take: 50,
          orderBy: { checkedAt: 'desc' },
        },
      },
    });

    if (!monitor || monitor.userId !== userId) {
      throw new NotFoundException('Monitor not found');
    }

    return monitor;
  }

  async update(userId: string, id: string, data: any) {
    await this.findOne(userId, id);
    return this.prisma.monitor.update({
      where: { id },
      data,
    });
  }

  async handleCheckResult(monitorId: string, status: 'UP' | 'DOWN', error?: string) {
    const monitor = await this.prisma.monitor.findUnique({
      where: { id: monitorId },
      include: { checks: { take: 3, orderBy: { checkedAt: 'desc' } } },
    });

    if (!monitor) return;

    // Logic for 3 consecutive failures
    const recentChecks = monitor.checks;
    const allFailed = recentChecks.length === 2 && status === 'DOWN' && recentChecks.every(c => c.status === 'DOWN');

    if (allFailed && monitor.status !== 'DOWN') {
      // Create Incident
      const incident = await this.prisma.incident.create({
        data: { monitorId, startedAt: new Date() },
      });

      await this.prisma.monitor.update({
        where: { id: monitorId },
        data: { status: 'DOWN' },
      });

      // Trigger AI Analysis
      this.aiService.analyzeIncident(incident.id);
      
      // Trigger Alerts
      this.alertsService.sendDowntimeAlert(monitorId, error || 'Multiple consecutive failures detected.');
    } else if (status === 'UP' && monitor.status === 'DOWN') {
      // Resolve Incident
      const activeIncident = await this.prisma.incident.findFirst({
        where: { monitorId, resolvedAt: null },
        orderBy: { startedAt: 'desc' },
      });

      if (activeIncident) {
        await this.prisma.incident.update({
          where: { id: activeIncident.id },
          data: { resolvedAt: new Date() },
        });
      }

      await this.prisma.monitor.update({
        where: { id: monitorId },
        data: { status: 'UP' },
      });

      // Trigger Recovery Alert
      this.alertsService.sendRecoveryAlert(monitorId);
    }
  }
}
