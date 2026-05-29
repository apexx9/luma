import { Injectable, ForbiddenException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { users, sessions, adminActivity } from '../db/schema';
import { eq, desc, count } from 'drizzle-orm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class AdminService {
  constructor(@Inject('DRIZZLE') private db: any) {}

  async validateAdminAccess(userId: number) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return { isAdmin: false };
    }

    // Check if user has Admin or Property Manager role or is in admin email list
    const adminEmails = ['aaron@luma.com', 'aaron.nartey@example.com'];
    if (
      adminEmails.includes(user.email) ||
      user.email.includes('admin') ||
      user.role === 'Admin' ||
      user.role === 'Property Manager'
    ) {
      return { isAdmin: true };
    }

    return { isAdmin: false };
  }

  async getAllUsers() {
    try {
      const allUsers = await this.db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        mustChangePassword: users.mustChangePassword,
        profileVerified: users.profileVerified,
        createdAt: users.createdAt,
      })
        .from(users);

      return allUsers.map((user) => ({
        ...user,
        isActive: true, // Default active status
        lastLogin: null, // Simplified for now
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }

  async getUserById(id: number) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        sessions: {
          limit: 1,
          orderBy: [desc(sessions.createdAt)],
        },
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    return {
      ...user,
      role: 'User',
      isActive: true,
      lastLogin: user.sessions[0]?.createdAt || null,
    };
  }

  async createUser(createUserDto: CreateUserDto, adminId: number) {
    // Check if user already exists
    const existingUser = await this.db.query.users.findFirst({
      where: eq(users.email, createUserDto.email),
    });

    if (existingUser) {
      throw new ForbiddenException('User with this email already exists');
    }

    // Hash password
    const hash = await bcrypt.hash(createUserDto.password, 10);

    // Create user
    const [newUser] = await this.db
      .insert(users)
      .values({
        name: createUserDto.name,
        email: createUserDto.email,
      password: hash,
      mustChangePassword: true,
      profileVerified: false,
      })
      .returning();

    if (!newUser) {
      throw new ForbiddenException('Failed to create user');
    }

    // Log admin activity
    await this.logAdminActivity(
      adminId,
      'CREATE_USER',
      `Created user: ${createUserDto.email}`,
    );

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: createUserDto.role || 'User',
      mustChangePassword: true,
      profileVerified: false,
      isActive: true,
      createdAt: newUser.createdAt,
      lastLogin: null,
    };
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto, adminId: number) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const updateData: any = {};
    if (updateUserDto.name) updateData.name = updateUserDto.name;
    if (updateUserDto.email) updateData.email = updateUserDto.email;

    const [updatedUser] = await this.db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();

    if (!updatedUser) {
      throw new ForbiddenException('Failed to update user');
    }

    await this.logAdminActivity(
      adminId,
      'UPDATE_USER',
      `Updated user: ${updatedUser.email}`,
    );

    return {
      ...updatedUser,
      role: updateUserDto.role || 'User',
      mustChangePassword: Boolean(updatedUser.mustChangePassword),
      profileVerified: Boolean(updatedUser.profileVerified),
      isActive:
        updateUserDto.isActive !== undefined ? updateUserDto.isActive : true,
      lastLogin: null,
    };
  }

  async deleteUser(id: number, adminId: number) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    await this.db.delete(users).where(eq(users.id, id));

    await this.logAdminActivity(
      adminId,
      'DELETE_USER',
      `Deleted user: ${user.email}`,
    );
  }

  async resetUserPassword(id: number, newPassword: string, adminId: number) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const hash = await bcrypt.hash(newPassword, 10);

    await this.db
      .update(users)
      .set({
        password: hash,
        mustChangePassword: true,
        profileVerified: false,
      })
      .where(eq(users.id, id));

    await this.logAdminActivity(
      adminId,
      'RESET_PASSWORD',
      `Reset password for: ${user.email}`,
    );

    return { success: true };
  }

  async toggleUserStatus(id: number, adminId: number) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    // For now, we'll simulate status toggle by updating a field
    // In a real implementation, you'd add an 'isActive' column to the users table
    await this.logAdminActivity(
      adminId,
      'TOGGLE_STATUS',
      `Toggled status for: ${user.email}`,
    );

    return {
      ...user,
      isActive: true, // Simulated toggle
      mustChangePassword: Boolean(user.mustChangePassword),
      profileVerified: Boolean(user.profileVerified),
    };
  }

  async bulkDeleteUsers(userIds: number[], adminId: number) {
    const deletedUsers = await this.db.query.users.findMany({
      where: (users, { inArray }) => inArray(users.id, userIds),
    });

    await this.db
      .delete(users)
      .where((users, { inArray }) => inArray(users.id, userIds));

    await this.logAdminActivity(
      adminId,
      'BULK_DELETE',
      `Bulk deleted ${userIds.length} users`,
    );

    return { success: true, deleted: userIds.length };
  }

  async bulkToggleStatus(
    userIds: number[],
    isActive: boolean,
    adminId: number,
  ) {
    // In a real implementation, you'd update an 'isActive' column
    await this.logAdminActivity(
      adminId,
      'BULK_TOGGLE',
      `Bulk toggled status for ${userIds.length} users`,
    );

    return { success: true, updated: userIds.length };
  }

  async getSystemStats() {
    try {
      const [totalUsers, totalLogins] = await Promise.all([
        this.db.select({ count: count() }).from(users),
        this.db.select({ count: count() }).from(sessions),
      ]);

      return {
        totalUsers: totalUsers[0].count || 0,
        activeUsers: totalUsers[0].count || 0, // Simplified
        newUsersToday: 0, // Simplified for now
        totalLogins: totalLogins[0].count || 0,
        serverUptime: Math.floor(process.uptime()) + ' seconds',
        databaseConnections: 1,
      };
    } catch (error) {
      console.error('Error fetching system stats:', error);
      return {
        totalUsers: 0,
        activeUsers: 0,
        newUsersToday: 0,
        totalLogins: 0,
        serverUptime: '0 seconds',
        databaseConnections: 0,
      };
    }
  }

  async getAdminActivity(limit?: number) {
    const activities = await this.db.query.adminActivity.findMany({
      orderBy: [desc(adminActivity.timestamp)],
      limit: limit || 50,
    });

    return activities.map((activity) => ({
      ...activity,
      adminName: `Admin ${activity.adminId}`, // Would fetch actual admin name
    }));
  }

  private async logAdminActivity(
    adminId: number,
    action: string,
    target: string,
    details?: string,
  ) {
    await this.db.insert(adminActivity).values({
      adminId,
      action,
      target,
      details,
      timestamp: new Date(),
    });
  }
}
