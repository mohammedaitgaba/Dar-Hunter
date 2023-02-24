import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt,Strategy } from "passport-jwt";
import { User } from "../users/schema/user.schema";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User.name)
        private userModel : Model<User>
        
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
          });
    }
    async validate(payload){
        console.log(payload);
        
        const {id}=payload
        const user = await this.userModel.findById(id)
        if (!user) {
            throw new UnauthorizedException('Go login first')
        }
        return user
    }
}