import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from 'src/shared/dto/CreatePost.dto';
import { NavigationOption } from 'src/utils/types';
import { Post } from './schema/post.schema';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name)
        private postModel:Model<Post>
    ){}
    async FetchPosts(options:NavigationOption):Promise<{posts:{},Total:number}>{
        const {Limit,Page}=options
        const Total = await this.postModel.count({Deleted: false})
        const posts = await this.postModel.find({
            Deleted: false
        }).skip((Page -1)*Limit).limit(Limit).populate("Maker",'-Password -createdAt -updatedAt -Birthday')
        if (!posts) {
            throw new  HttpException('No Posts found',HttpStatus.BAD_REQUEST)
        }
        return {"posts":posts,"Total":Total}
    }
    async AddPost(postData:CreatePostDto):Promise<{message:string}>{
        const post = this.postModel.create(postData)
        if (!post) {
            throw new Error('Post creation failed')
        }
        return {message:'Created post succ'}
    }
}
