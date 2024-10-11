import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

/**
 * User entity representing a user in the system.
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier of the user' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Name of the user' })
  name: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'Email address of the user' })
  email: string;
}
