import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';

describe('App end to end', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http:///localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('Signup', () => {
      const dto: AuthDto = {
        email: 'test99@gmail.com',
        password: 'test',
      };
      it('should Signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });

      it('throw error on empty email', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ passpord: dto.password })
          .expectStatus(400);
      });
    });

    describe('Signin', () => {
      it('should Signin', () => {
        const dto: AuthDto = {
          email: 'test99@gmail.com',
          password: 'test',
        };
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user data', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200);
      });
    });
    describe('Edit user', () => {});
  });

  describe('Bookmark', () => {
    describe('Create bookmark', () => {});
    describe('Get bookmarks', () => {});
    describe('Get bookmark by Id', () => {});
    describe('Edit bookmarks', () => {});
    describe('Delete bookmarks', () => {});
  });
});
