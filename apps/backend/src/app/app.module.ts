import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth-google/auth.module';
@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/auth'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
