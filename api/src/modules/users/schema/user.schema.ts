import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema({
    timestamps:true,
})
export class User {
    @Prop()
    FirstName:String
    @Prop()
    LastName:String
    @Prop({unique: [true,'Duplicated email']})
    Email:String
    @Prop()
    Phone:String
    @Prop()
    Birthday:Date
    @Prop()
    Password:String
}
export const UserSchema = SchemaFactory.createForClass(User)