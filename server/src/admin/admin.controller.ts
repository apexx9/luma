import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('validate')
  async validateAdminAccess(@Req() req: any) {
    return this.adminService.validateAdminAccess(req.user.userId);
  }

  // User Management
  @Get('users')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: string) {
    return this.adminService.getUserById(parseInt(id));
  }

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto, @Req() req: any) {
    const adminId = req.user?.userId || 1; // Default to admin user 1 for now
    return this.adminService.createUser(createUserDto, adminId);
  }

  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: any) {
    const adminId = req.user?.userId || 1;
    return this.adminService.updateUser(parseInt(id), updateUserDto, adminId);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string, @Req() req: any) {
    const adminId = req.user?.userId || 1;
    return this.adminService.deleteUser(parseInt(id), adminId);
  }

  @Post('users/:id/reset-password')
  async resetUserPassword(@Param('id') id: string, @Body('password') newPassword: string, @Req() req: any) {
    const adminId = req.user?.userId || 1;
    return this.adminService.resetUserPassword(parseInt(id), newPassword, adminId);
  }

  @Post('users/:id/toggle-status')
  async toggleUserStatus(@Param('id') id: string, @Req() req: any) {
    const adminId = req.user?.userId || 1;
    return this.adminService.toggleUserStatus(parseInt(id), adminId);
  }

  // Bulk Operations
  @Post('users/bulk-delete')
  async bulkDeleteUsers(@Body('userIds') userIds: number[], @Req() req: any) {
    const adminId = req.user?.userId || 1;
    return this.adminService.bulkDeleteUsers(userIds, adminId);
  }

  @Post('users/bulk-toggle')
  async bulkToggleStatus(@Body('userIds') userIds: number[], @Body('isActive') isActive: boolean, @Req() req: any) {
    const adminId = req.user?.userId || 1;
    return this.adminService.bulkToggleStatus(userIds, isActive, adminId);
  }

  // System Statistics
  @Get('stats')
  async getSystemStats() {
    return this.adminService.getSystemStats();
  }

  // Activity Log
  @Get('activity')
  async getAdminActivity(@Query('limit') limit?: string) {
    return this.adminService.getAdminActivity(limit ? parseInt(limit) : undefined);
  }
}
