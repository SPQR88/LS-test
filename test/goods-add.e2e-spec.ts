import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Adding goods', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should not add a non-existent good', () => {
    return request(app.getHttpServer())
      .post('/goods/add')
      .send([
        {
          location: 'AB-1',
          good: 'NonExistentGood',
          quantity: 5,
        }
      ])
      .expect(404)
      .expect({
          message: 'Good with name NonExistentGood not found',
          error: 'Not Found',
          statusCode: 404
      });
  });

  it('should not add to a non-existent location', () => {
    return request(app.getHttpServer())
      .post('/goods/add')
      .send([
        {
          location: 'NonExistentRack-NonExistentSection',
          good: 'L42321 SM',
          quantity: 5,
        }
      ])
      .expect(404)
      .expect({
          "message": "Location with rack NonExistentRack and section NonExistentSection not found",
          "error": "Not Found",
          "statusCode": 404
      });
  });

  it('should successfully add a good', () => {
    return request(app.getHttpServer())
      .post('/goods/add')
      .send([
        {
          location: 'CB-3',
          good: 'L42321 SM',
          quantity: 2,
        }
      ])
      .expect(201)
      .expect({
        "success": true,
        "message": "Goods were successfully added"
    });
  });

  afterAll(async () => {
    await app.close();
  });
});