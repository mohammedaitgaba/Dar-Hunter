 export interface AuthState {
    isError: boolean
    isSuccess:boolean
    isLoading:boolean
    message:string|unknown
    user: {
      name: string;
      id: string;
      token:string
    } | null;
}