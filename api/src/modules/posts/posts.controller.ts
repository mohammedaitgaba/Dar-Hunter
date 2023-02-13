import { Controller, ValidationPipe } from '@nestjs/common';
import { Body, Delete, Get,Param,Post, Put, UsePipes } from '@nestjs/common/decorators';
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
    @Get('onePost/:id')
    GetPostById(@Param('id') id: string){
        console.log("ff");
        
        return this.postService.GetPostById(id)
    }
    @Put('UpdatePost')
    @UsePipes(new ValidationPipe())
    UpdatePostById(@Body() data:PostType){
        return this.postService.UpdatePost(data)
    }
    @Put('DeletePost')
    SoftDeletePost(@Body() data:{id:string}){
        
        return this.postService.DeletePost(data.id)
    }
    @Get('ArchivePosts')
    GetDeletedPosts(){
        return this.postService.FetchDeletedPosts()
    }
}
