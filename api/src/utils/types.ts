export type UserType = {
    id:String
    FirstName:String
    LastName:String
    Email:String
    ProfilePicUrl:string
    Phone:String
    Birthday:Date
    Password:String
}
export type PostType = {
    _id:string
    Maker: string
    Title:string
    Description:string
    Details:[{}]
    Price:number
    PropertyType:string
    TransactionType: string
    Availability:boolean
    Deleted:boolean
    City: string
    Sector: string
    Location: [{
        lang: number
        latit: number
    }]
    Pics:[string]
}
export type NavigationOption ={
    Limit:number
    Page:number   
}