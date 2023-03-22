import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema({
    timestamps:true,
})
export class User {
    @Prop()
    FirstName:string
    @Prop()
    LastName:string
    @Prop({unique: [true,'Duplicated email']})
    Email:string
    @Prop()
    Phone:String
    @Prop()
    ProfilePicUrl:string
    @Prop()
    Birthday:Date
    @Prop()
    CIN:string
    @Prop()
    Password:string
    @Prop({default:false})
    Trusted:boolean
    @Prop({default:false})
    Deleted:boolean
}
export const UserSchema = SchemaFactory.createForClass(User)