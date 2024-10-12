import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env.test' });

process.env.NODE_ENV = 'test';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DataSource } from 'typeorm'; // Import DataSource
import { AppModule } from '../src/app.module';

jest.setTimeout(30000);

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Get the DataSource instance
    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    // Close the database connection
    await dataSource.destroy();
    await app.close();
  });

  beforeEach(async () => {
    // Synchronize the database schema
    await dataSource.synchronize(true);
  });

  it('/users (GET)', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([]);
  });
});
