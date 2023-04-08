import { Controller, ValidationPipe } from '@nestjs/common';
import { Body, Delete, Get,Param,Post, Put, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
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
        return this.postService.GetPostById(id)
    }
    @Post('myPosts')
    GetMyPosts(@Body() id:{maker:string}){
        return this.postService.GetMyPosts(id.maker)
    }
    @Put('UpdatePost')
    @UseGuards(AuthGuard())
    @UsePipes(new ValidationPipe())
    UpdatePostById(@Body() data:PostType){
        return this.postService.UpdatePost(data)
    }
    @Put('DeletePost')
    @UseGuards(AuthGuard())
    SoftDeletePost(@Body() data:{post_id:string,id:string}){                
        return this.postService.DeletePost(data)
    }
    @Get('ArchivePosts')
    GetDeletedPosts(){
        return this.postService.FetchDeletedPosts()
    }
}
