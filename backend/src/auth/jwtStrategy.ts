import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
    console.log(ExtractJwt.fromAuthHeaderAsBearerToken());
  }

  //verified callback
  async validate(payload: any) {
    return {
      id: payload.id,
      email: payload.email,
      nom: payload.nom,
      prenom: payload.prenom,
      password: payload.password,
    };
  }
}
