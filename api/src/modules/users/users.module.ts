import { Module, NestModule,MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../Auth/auth.module';
import { UserSchema } from './schema/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule 
// implements NestModule 
{ 
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthMiddleware).exclude({
  //     path:'users/AllUsers',
  //     method: RequestMethod.GET
  //   }).forRoutes(UsersController)
  // }
 }
