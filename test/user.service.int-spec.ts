import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';

describe('UserService Integration', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT, 10) || 5432,
          username: process.env.DB_USERNAME || 'postgres',
          password: process.env.DB_PASSWORD || 'yourpassword',
          database: process.env.DB_DATABASE || 'mydatabase',
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    // Close the database connection after tests
    await service.onModuleDestroy();
  });

  it('should create and retrieve a user', async () => {
    const user = await service.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
    });

    const users = await service.findAll();
    expect(users).toContainEqual(user);
  });

  // Additional integration tests...
});
