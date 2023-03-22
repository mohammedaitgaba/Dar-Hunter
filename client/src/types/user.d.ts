export interface User{
    Email:string
    Password:string
    FirstName:string
    LastName:string
    Phone:string
    Birthday:Date
    CIN:string
    ProfilePicUrl?:string
    createdAt?:Date
}