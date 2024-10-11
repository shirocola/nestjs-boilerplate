// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entities
import { User } from './entities/user.entity';

/**
 * Service handling business logic for users.
 */
@Injectable()
export class UserService {
  /**
   * Constructs a new UserService.
   * @param userRepository The repository for user entities.
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Retrieves all users.
   * @returns A promise of an array of User entities.
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Additional methods...
}
