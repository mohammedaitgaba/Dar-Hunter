import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/DarHunter')
  ],
  controllers: [
  ],
  providers: [
  ],
})
export class AppModule {}
