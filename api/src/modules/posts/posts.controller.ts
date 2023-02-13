import { Controller, ValidationPipe } from '@nestjs/common';
import { Body, Get,Post, UsePipes } from '@nestjs/common/decorators';
import { CreatePostDto } from 'src/shared/dto/CreatePost.dto';
import { NavigationOption } from 'src/utils/types';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor (private postService :PostsService){}
    @Post('AllPosts')
    GetAllPosts(@Body() options:NavigationOption){
        return this.postService.FetchPosts(options)
    }
    @Post('NewPost')
    @UsePipes(new ValidationPipe())
    AddNewPost(@Body() postData:CreatePostDto){
       return this.postService.AddPost(postData)
    }
}
