import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { RefershToken, refreshTokenSchema } from './schemas/refreshToken.schema';

@Global()
@Module({
  imports:[
    MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
    MongooseModule.forFeature([{name:RefershToken.name, schema:refreshTokenSchema}]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService)=>{
        return{
          secret: config.get<string>('JWT_SECRET'),
          signOptions:{
            expiresIn: config.get<string | number>('JWT_EXPIRES')
          }
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[JwtModule]
})
export class AuthModule {}
