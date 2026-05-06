import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class AIService {
  private openai: OpenAI;

  constructor(private prisma: PrismaService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async analyzeIncident(incidentId: string) {
    const incident = await this.prisma.incident.findUnique({
      where: { id: incidentId },
      include: { 
        monitor: {
          include: { 
            checks: { take: 5, orderBy: { checkedAt: 'desc' } }
          }
        } 
      },
    });

    if (!incident) return;

    const lastCheck = incident.monitor.checks[0];
    const prompt = `
      Analyze the following downtime incident for monitor "${incident.monitor.name}":
      - Type: ${incident.monitor.type}
      - URL: ${incident.monitor.url}
      - Error Message: ${lastCheck?.errorMessage || 'Unknown error'}
      - Status Code: ${lastCheck?.statusCode || 'N/A'}
      - Response Time: ${lastCheck?.responseTime || 'N/A'}ms

      Provide a brief root cause analysis and a suggestion for the developer.
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
      });

      const analysis = response.choices[0].message.content;
      
      await this.prisma.incident.update({
        where: { id: incidentId },
        data: { 
          rootCause: analysis,
          debugSuggestion: 'Check your logs for the specific error code mentioned above.'
        },
      });
    } catch (error) {
      console.error('AI Analysis failed:', error);
    }
  }
}
