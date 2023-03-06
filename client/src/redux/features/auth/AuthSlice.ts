import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {User} from '../../../types/user'
import {AuthState} from '../../../types/authState'

interface LoginInfo {
    Email:string
    Password:string
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

export const register = createAsyncThunk<AuthState["user"], User, { rejectValue: string }>('userRegister',async(user:User,thunkApi)=>{
    try {
        return await  registerUser(user)
    } catch (error:any) {
        const message:string = (error?.response && error.response.data&&error.response.data.message)
        || error.message ||error.toSring() 
        return thunkApi.rejectWithValue(message) 
    }
})

export const Login = createAsyncThunk<AuthState["user"], User, { rejectValue: string }>('userLogin',async(user,thunkApi)=>{
    try {
        return await  loginUser(user)
    } catch (error:any) {
        const message:string = (error?.response && error.response.data&&error.response.data.message)
        || error.message ||error.toSring() 
        return thunkApi.rejectWithValue(message) 
    }
})


export const logout = createAsyncThunk('userLogout',async()=>{
    return await LogoutUser()
})

const loginUser = async(userData:LoginInfo)=>{
    const response = await axios.post('http://localhost:3000/auth/SignIn',userData)
    if (response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}
const LogoutUser = async()=>{
    localStorage.removeItem('user')
}
const registerUser = async (userData:User)=>{
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
        .addCase(Login.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(Login.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(Login.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.message = action.payload
            state.user = null
        })
        .addCase(logout.fulfilled,(state)=>{
            state.user=null
        })
    }
})
export const {reset} = authSlice.actions
export default authSlice.reducer