import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps:true,
})
export class Post {
    @Prop()
    Title:string
    @Prop()
    Description:string
    @Prop()
    Details:[{}]
    @Prop()
    Price:number
    @Prop({enum:['Home','Appartment','Villa','GroundSpot']})
    PropertyType:string
    @Prop({default:true})
    Availability:boolean
    @Prop({default:false})
    Deleted:boolean

}
export const PostSchema = SchemaFactory.createForClass(Post)