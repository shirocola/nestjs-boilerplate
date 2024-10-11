// src/user/user.controller.ts
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

/**
 * Controller managing HTTP requests for users.
 */
@Controller('users')
export class UserController {
  /**
   * Constructs a new UserController.
   * @param userService The service handling user business logic.
   */
  constructor(private readonly userService: UserService) {}

  /**
   * Handles GET requests to retrieve all users.
   * @returns An array of User entities.
   */
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
