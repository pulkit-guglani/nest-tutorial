import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signup() {
    return 'Signed up';
  }
  signin() {
    return 'logged in';
  }
}
