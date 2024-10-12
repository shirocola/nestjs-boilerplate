import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Controllers and Services
import { UserController } from './user.controller';
import { UserService } from './user.service';
// Entities
import { User } from './entities/user.entity';
import { NotificationService } from '../notification/notification.service'; // Corrected import path

/**
 * Module encapsulating user-related components.
 */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, NotificationService],
  exports: [UserService], // Exported UserService
})
export class UserModule {}
