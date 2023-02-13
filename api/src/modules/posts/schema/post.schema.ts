import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

import { User } from "src/modules/users/schema/user.schema";

@Schema({
    timestamps:true,
})
export class Post {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    Maker: User
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
    @Prop({enum:['Sell', 'Rent', 'Demande', 'Mortgage']})
    TransactionType: string
    @Prop({default:true})
    Availability:boolean
    @Prop({default:false})
    Deleted:boolean
    @Prop()
    City: string
    @Prop()
    Sector: string
    @Prop()
    Location: [{
        lang: number
        latit: number
    }]

}
export const PostSchema = SchemaFactory.createForClass(Post)