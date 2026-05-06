import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { HeartbeatService } from './heartbeat.service';

@Controller('heartbeat')
export class HeartbeatController {
  constructor(private readonly heartbeatService: HeartbeatService) {}

  @Get(':token')
  @HttpCode(HttpStatus.OK)
  async ping(@Param('token') token: string) {
    return this.heartbeatService.handlePing(token);
  }
}
