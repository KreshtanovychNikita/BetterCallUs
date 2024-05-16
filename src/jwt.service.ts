import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user) {
    const payload = { email: user.email, sub: user.sub };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}
