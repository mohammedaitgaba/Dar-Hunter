
import React, { useState,useRef  } from 'react';
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

const Paper = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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

    const SwitchModal =()=>{
        handleSwitcher('Register')
    }

    const handleSubmit = ()=>{

      const errors = {
        email:'',
        password:''
      };
      const email: string | null = emailRef.current?.value ?? null;
      const password:string|null = passwordRef.current?.value ??null;
      // Validate email
      if (!email) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email address is invalid";
      }
  
      // Validate password
      if (!password) {
        errors.password = "Password is required";
      } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
  
      if (Object.keys(errors).length === 0) {
        // Form is valid, submit it
        console.log("ddd");
        console.log("Submitting form", { email, password });
      } else {
        
        // Form is invalid, update state with errors
        setErrors(errors);
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