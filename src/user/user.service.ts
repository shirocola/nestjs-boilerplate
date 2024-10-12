import { Injectable, NotFoundException, OnModuleDestroy } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entities and DTOs
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * Service handling business logic for users.
 */
@Injectable()
export class UserService implements OnModuleDestroy {
  /**
   * Constructs a new UserService.
   * @param userRepository The repository for user entities.
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Lifecycle hook that is called when the module is destroyed.
   * You can perform any necessary cleanup here.
   */
  onModuleDestroy(): void {
    // Cleanup logic, if necessary
  }

  /**
   * Retrieves all users.
   * @returns A promise of an array of User entities.
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * Retrieves a user by ID.
   * @param id User ID.
   * @returns A promise of the User entity.
   * @throws NotFoundException if the user is not found.
   */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  /**
   * Creates a new user.
   * @param createUserDto Data to create a new user.
   * @returns A promise of the created User entity.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  /**
   * Updates an existing user.
   * @param id User ID.
   * @param updateUserDto Data to update the user.
   * @returns A promise of the updated User entity.
   * @throws NotFoundException if the user is not found.
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOneBy({ id });
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return updatedUser;
  }

  /**
   * Deletes a user.
   * @param id User ID.
   * @returns A promise that resolves when the user is deleted.
   * @throws NotFoundException if the user is not found.
   */
  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }
}
