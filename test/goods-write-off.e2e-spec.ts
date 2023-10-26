import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Write-off of goods', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should not allow withdrawal of goods more than available in specific location', async () => {
    let good = "L42321 SM";
    let location = "CB-3";

    // get quantity
    const response = await request(app.getHttpServer()).get(`/goods/quantity?good=${good}&location=${location}`);
    const currentQuantity = response.body.quantity;

    // Try to withdraw more goods than available
    await request(app.getHttpServer())
      .post('/goods/writeoff')
      .send([
        {
          location: location,
          good: good,
          quantity: currentQuantity + 1,
        }
      ])
      .expect(404)
      .expect({
          "message": `Not enough Good with name ${good} in location ${location}`,
          "error": "Not Found",
          "statusCode": 404
      });
  });

  it('should successfully withdrawal of goods', async () => {
    let good = "L42321 SM";
    let location = "CB-3";

    // get quantity
    const response = await request(app.getHttpServer()).get(`/goods/quantity?good=${good}&location=${location}`);
    const currentQuantity = response.body.quantity;

    // Try to withdraw goods
    await request(app.getHttpServer())
      .post('/goods/writeoff')
      .send([
        {
          location: location,
          good: good,
          quantity: currentQuantity - 1,
        }
      ])
      .expect(201)
      .expect({
        success: true,
        message: 'Goods were successfully write-off'
      });

    // return quantity of goods
    await request(app.getHttpServer())
      .post('/goods/add')
      .send([
        {
          location: location,
          good: good,
          quantity: currentQuantity - 1,
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
