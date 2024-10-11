// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Controllers and Services
import { UserController } from './user.controller';
import { UserService } from './user.service';
// Entities
import { User } from './entities/user.entity';
import { NotificationService } from 'src/notification/notification.service';

/**
 * Module encapsulating user-related components.
 */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, NotificationService],
})
export class UserModule {}
