import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('App end to end', () => {
  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });
  it.todo('should pas');
});
