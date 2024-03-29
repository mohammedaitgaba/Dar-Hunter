import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from 'src/shared/dto/CreatePost.dto';
import { NavigationOption, PostType } from 'src/utils/types';
import { Post } from './schema/post.schema';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name)
        private postModel:Model<Post>
    ){}
    async FetchPosts(options:NavigationOption):Promise<{posts:{},Total:number,TotalPages:number}>{
        const {Limit,Page}=options
        const Total = await this.postModel.count({Deleted: false})
        const TotalPages = Math.ceil(Total/Limit)
        const posts = await this.postModel.find({
            Deleted: false
        }).skip((Page -1)*Limit).limit(Limit).populate("Maker",'-Password -createdAt -updatedAt -Birthday')
        if (!posts) {
            throw new  HttpException('No Posts found',HttpStatus.BAD_REQUEST)
        }
        return {"posts":posts,"Total":Total,"TotalPages":TotalPages}
    }
    async AddPost(postData:CreatePostDto):Promise<{message:string}>{
        const post = this.postModel.create(postData)
        if (!post) {
            throw new Error('Post creation failed')
        }
        return {message:'Created post succ'}
    }
    async GetPostById(id:string):Promise<{post:{}}>{
        const post = await this.postModel.findOne({_id:id,Deleted:false}).populate("Maker",'-Password -createdAt -updatedAt -Birthday')
        if (!post) {
            throw new HttpException('Post not found',HttpStatus.BAD_REQUEST)
        }
        return {post}
    }

    async GetMyPosts(id:string):Promise<{MyPosts:{}}>{
        const MyPosts = await this.postModel.find({
            Maker:id,
            Deleted:false
        })
        return {MyPosts}
    }
    async UpdatePost(data:PostType):Promise<{message:string}>{
        console.log(data);
        const checkPost = await this.postModel.findOne({_id:data._id,Deleted:false})
        if (!checkPost) {
            throw new HttpException('Post not found',HttpStatus.BAD_REQUEST)
        }
        const updatePost = await this.postModel.findByIdAndUpdate(data._id,data,{
            new:true
        })
        if (!updatePost) {
            throw new HttpException('Something went wrong please try again...',HttpStatus.BAD_REQUEST) 
        }
        return {message:'Updated Succesfully'}
    }
    async DeletePost(data):Promise<{message:string}>{
        
        const checkPost = await this.postModel.findOne({_id:data.id_post,Deleted:false})
        if (!checkPost) {
            throw new HttpException('Post not found',HttpStatus.BAD_REQUEST)
        }
        const deletePost = await this.postModel.findByIdAndUpdate(data.id_post,{$set: {
            Deleted: true
        }})
        if (!deletePost) {
            throw new HttpException('Oups Somthing went wrong...',HttpStatus.BAD_REQUEST)
        }
        return{message:`Deleted Succesfully`}
    }
    async FetchDeletedPosts():Promise<{deletedPosts:{}}>{
        const deletedPosts = await this.postModel.find({
            Deleted:true
        })
        if (!deletedPosts) {
            throw new  HttpException('No Deleted Posts found',HttpStatus.BAD_REQUEST)     
        }
        return {deletedPosts}
    }
}
