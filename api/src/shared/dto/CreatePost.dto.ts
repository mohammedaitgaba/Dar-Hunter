import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator"

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    Maker: string

    @IsNotEmpty()
    @IsString()
    Title: string

    @IsString()
    @IsNotEmpty()
    Description: string

    @IsString()
    @IsEnum(['Home', 'Appartment', 'Villa', 'GroundSpot'])
    PropertyType: string

    @IsEnum(['Sell', 'Rent', 'Demande', 'Mortgage'])
    TransactionType: string

    @IsNotEmpty()
    @IsString()
    City: string

    @IsString()
    Sector: string

    @IsArray()
    Location: [{
        lang: number
        latit: number
    }]

    @IsArray()
    Details: [{
        Surface: number,
        Rooms: number,
        floors: number
    }]
    @IsArray()
    Pics: []
    
    @IsNotEmpty()
    @IsNumber()
    Price: number


}