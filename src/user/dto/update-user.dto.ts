import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * Data Transfer Object for updating a user.
 * Extends CreateUserDto with optional fields.
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
