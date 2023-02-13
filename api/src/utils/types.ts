export type UserType = {
    id:String
    FirstName:String
    LastName:String
    Email:String
    Phone:String
    Birthday:Date
    Password:String
}
export type PostType = {
    id:string
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
}
export type NavigationOption ={
    Limit:number
    Page:number   
}