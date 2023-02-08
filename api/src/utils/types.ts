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
    Title:String
    Description:String
    Details:[String]
    Disponibility : Boolean
    Type : String
    Price : number
}
export type NavigationOption ={
    Limit:number
    Page:number   
}