
import React, { useState,useRef, useEffect  } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import {
  TextField,
  Grid,
  Typography,
  Box
} from "@mui/material";

import PrimaryButton from '../global/buttons/PrimaryButton';
import { Dispatch } from '@reduxjs/toolkit';
import { useSelector,useDispatch } from 'react-redux';
import { Login,reset } from '../../redux/features/auth/AuthSlice';


const Paper = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  [theme.breakpoints.down('sm')]: {
    width: '90%',
  },
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
}));
interface ModalProps{
    open:boolean
    handleClose:()=>void
    handleSwitcher:(modalName:string)=>void
}
const LoginModal = ({ open, handleClose,handleSwitcher}:ModalProps) => {
    const theme = useTheme();
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef =  useRef<HTMLInputElement | null>(null);
    const [errors, setErrors] = useState({
      email:'',
      password:''
    });

    const dispatch: Dispatch<any> = useDispatch();
    const {user,isLoading,isError,isSuccess,message}=useSelector((state:any)=>state.auth)


    const SwitchModal =()=>{
        handleSwitcher('Register')
    }

    const CheckInputsValidation= ()=>{
      const errors = {
        email:'',
        password:''
      };
      const Email: string | null = emailRef.current?.value ?? null;
      const Password:string|null = passwordRef.current?.value ??null;
      // Validate email
      if (!Email) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(Email)) {
        errors.email = "Email address is invalid";
      }
  
      // Validate password
      if (!Password) {
        errors.password = "Password is required";
      } else if (Password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
  
      if (Object.keys(errors).some(v=>v)) {
        // Form is valid, submit it
        setErrors(errors);      
        return {
          Email,
          Password
        }
      } else {
        setErrors(errors);
        return false
      }
    }
    useEffect(()=>{
      if (isSuccess) {
        handleClose()
      }
      dispatch(reset())
    },[user,isLoading,isError,isSuccess,message])
    const handleSubmit = ()=>{
      const formData:any = CheckInputsValidation()
      if (formData) {
        dispatch(Login(formData))
      }
    }
    return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Grid container>
        <Grid item xs={12}>
          <Paper>
          <Typography variant="h5" align="center">
            Welcome Back
          </Typography>
            <form onSubmit={e => e.preventDefault()}>
            <TextField
              label="Email"
              type="email"
              inputRef={emailRef}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              sx={{marginTop:3,marginBottom:3}}
            />
            <TextField
              label="Password"
              type="password"
              inputRef={passwordRef}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              sx={{marginBottom:3}}
            />
            <Button component="span" variant="text" sx={{width:'100%',justifyContent:'end'}} onClick={SwitchModal}>
              Not a member 
            </Button>
            <Box sx={{display:'flex',width:'100%',justifyContent:'space-around'}}>
              <PrimaryButton title="Login" onClick={()=>handleSubmit()} width="140px" height="45px"/>
              <Button component="span" variant="text" onClick={() => handleClose()}>
                Cancel
              </Button>
            </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Modal>
    );
  };
  export default LoginModal