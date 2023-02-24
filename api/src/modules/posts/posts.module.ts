import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../Auth/auth.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostSchema } from './schema/post.schema';

@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
