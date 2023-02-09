import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schema/post.schema';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name)
        private userModel:Model<Post>
    ){}
}
