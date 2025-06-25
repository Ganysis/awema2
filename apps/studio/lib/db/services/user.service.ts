import { User, UserRole, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export interface UpdateUserInput {
  email?: string;
  password?: string;
  name?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export class UserService {
  private static readonly BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '10');
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-in-production';
  private static readonly SESSION_EXPIRY_HOURS = parseInt(process.env.SESSION_EXPIRY_HOURS || '24');

  /**
   * Create a new user
   */
  static async create(data: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, this.BCRYPT_ROUNDS);
    
    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  /**
   * Find user by ID
   */
  static async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Find user by email
   */
  static async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Update user
   */
  static async update(id: string, data: UpdateUserInput): Promise<User> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, this.BCRYPT_ROUNDS);
    }

    return prisma.user.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete user
   */
  static async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  /**
   * List users with pagination
   */
  static async list(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    const { skip = 0, take = 10, where, orderBy } = params;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take,
        where,
        orderBy: orderBy || { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users,
      total,
      pages: Math.ceil(total / take),
    };
  }

  /**
   * Login user
   */
  static async login(data: LoginInput): Promise<{ user: User; token: string; session: any }> {
    const user = await this.findByEmail(data.email);
    
    if (!user || !user.isActive) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      } as AuthTokenPayload,
      this.JWT_SECRET,
      { expiresIn: `${this.SESSION_EXPIRY_HOURS}h` }
    );

    // Create session
    const session = await prisma.session.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + this.SESSION_EXPIRY_HOURS * 60 * 60 * 1000),
      },
    });

    return {
      user,
      token,
      session,
    };
  }

  /**
   * Logout user
   */
  static async logout(token: string): Promise<void> {
    await prisma.session.delete({
      where: { token },
    });
  }

  /**
   * Verify token
   */
  static async verifyToken(token: string): Promise<User | null> {
    try {
      // Check if session exists and is not expired
      const session = await prisma.session.findUnique({
        where: { token },
        include: { user: true },
      });

      if (!session || session.expiresAt < new Date()) {
        if (session) {
          await prisma.session.delete({ where: { id: session.id } });
        }
        return null;
      }

      // Verify JWT
      const payload = jwt.verify(token, this.JWT_SECRET) as AuthTokenPayload;
      
      if (payload.userId !== session.userId) {
        return null;
      }

      return session.user;
    } catch (error) {
      return null;
    }
  }

  /**
   * Clean expired sessions
   */
  static async cleanExpiredSessions(): Promise<void> {
    await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }

  /**
   * Change password
   */
  static async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid current password');
    }

    await this.update(userId, { password: newPassword });
  }

  /**
   * Request password reset (returns reset token)
   */
  static async requestPasswordReset(email: string): Promise<string> {
    const user = await this.findByEmail(email);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { userId: user.id, type: 'password-reset' },
      this.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // In production, send email with reset link
    // await EmailService.sendPasswordResetEmail(user.email, resetToken);

    return resetToken;
  }

  /**
   * Reset password with token
   */
  static async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const payload = jwt.verify(token, this.JWT_SECRET) as any;
      
      if (payload.type !== 'password-reset') {
        throw new Error('Invalid token');
      }

      await this.update(payload.userId, { password: newPassword });
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}