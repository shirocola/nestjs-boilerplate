import { IsString, IsEmail } from 'class-validator';

/**
 * Data Transfer Object for creating a user.
 */
export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
