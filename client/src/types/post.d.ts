export interface Post {
    _id: string
            Maker: {
                _id: string,
                FirstName: string,
                LastName: string,
                Email: string,
                Phone: string,
                Trusted: boolean,
                Deleted: boolean,
                __v: number
            },
            Title: string,
            Description: string,
            Price: number,
            PropertyType: string,
            TransactionType: string,
            Availability: boolean,
            Deleted: boolean,
            City: string,
            Sector: string,
            Location: [
                {
                    lang: number,
                    latit: number
                }
            ],
            Details: [
                {
                    Rooms: number,
                    Surface:number ,
                    floors: number
                }
            ],
            createdAt: Date,
            updatedAt: Date,
}
export interface PostData {
    _id: string
    Title: string,
    Description: string,
    Price: number,
    PropertyType: string,
    TransactionType: string,
    City: string,
    Sector: string,
    Location?: [
        {
            lang: number,
            latit: number
        }
    ],
    Details: [
        {
            Rooms: number,
            Surface:number ,
            floors: number
        }
    ],
    Pics : {
        url:string
    }
}