import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    console.log(data, ctx);
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
