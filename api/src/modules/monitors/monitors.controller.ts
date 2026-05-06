import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { MonitorsService } from './monitors.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('monitors')
@UseGuards(JwtAuthGuard)
export class MonitorsController {
  constructor(private readonly monitorsService: MonitorsService) {}

  @Post()
  create(@Request() req: any, @Body() data: any) {
    return this.monitorsService.create(req.user.userId, data);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.monitorsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.monitorsService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() data: any) {
    return this.monitorsService.update(req.user.userId, id, data);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.monitorsService.delete(req.user.userId, id);
  }
}
