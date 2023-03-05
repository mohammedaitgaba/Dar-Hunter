import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { stat } from 'fs'
interface AuthState {
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

const storedUser = localStorage.getItem('user');
const user: AuthState["user"] = storedUser ? JSON.parse(storedUser) : null;

const initialState: AuthState = {
    isError: false,
    isSuccess:false,
    isLoading:false,
    user:user? user:null,
    message:''
}

export const register = createAsyncThunk('userRegister',async(user,thunkApi)=>{
    try {
        return await  registerUser(user)
    } catch (error) {
        const message = (error?.response && error.response.data&&error.response.data.message)
        || error.message ||error.toSring() 
        return thunkApi.rejectWithValue(message)
        
    }
})

const registerUser = async (userData)=>{
    const response =  await axios.post('http://localhost:3000/auth/Register',userData)
    if (response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=false,
            state.message=''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(register.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.message = action.payload
            state.user = null
        })
    }
})
export const {reset} = authSlice.actions
export default authSlice.reducer