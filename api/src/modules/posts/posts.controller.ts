import { Controller, ValidationPipe } from '@nestjs/common';
import { Body, Get,Param,Post, Put, UsePipes } from '@nestjs/common/decorators';
import { CreatePostDto } from 'src/shared/dto/CreatePost.dto';
import { NavigationOption, PostType } from 'src/utils/types';
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
    @Get(':id')
    GetPostById(@Param('id') id: string){
        return this.postService.GetPostById(id)
    }
    @Put('UpdatePost')
    @UsePipes(new ValidationPipe())
    UpdatePostById(@Body() data:PostType){
        return this.postService.UpdatePost(data)
    }
}
