import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [AuthModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRoot("mongodb+srv://ashanwisal08:root@cluster0.tvzjfz0.mongodb.net/login-signup")
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
