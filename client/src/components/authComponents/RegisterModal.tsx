import React,{useRef,useState,useEffect} from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import {
  TextField,
  Grid,
  Typography,
  Box,
  useMediaQuery
} from "@mui/material";

import PrimaryButton from '../global/buttons/PrimaryButton';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register,reset } from '../../redux/features/auth/AuthSlice';
import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { User } from '../../types/user';


interface ModalProps{
    open:boolean
    handleClose:()=>void
    handleSwitcher:(modalName:string)=>void
}
const Paper = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    padding:theme.spacing(2)
  },
}));

const RegisterModal = ({ open, handleClose,handleSwitcher }:ModalProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    // form Refs 
    const navigate = useNavigate()
    const dispatch: Dispatch<any> = useDispatch();
    // const dispatch = useDispatch()

    const {user,isLoading,isError,isSuccess,message}=useSelector((state:any)=>state.auth)

    useEffect(()=>{
      if (isSuccess) {
        handleClose()
      }
      if (isError) {
        toast.error(`Data error ${message}`)
      }
      dispatch(reset())
    },[user,isLoading,isError,isSuccess,message])

    const FNameRef =  useRef<HTMLInputElement | null>(null);
    const LNameRef =  useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const PhoneRef = useRef<HTMLInputElement | null>(null);
    const ProfilePicUrl = "";
    const BrithdayRef = useRef<HTMLInputElement | null>(null);
    const CINRef = useRef<HTMLInputElement | null>(null);
    const passwordRef =  useRef<HTMLInputElement | null>(null);
    const PasswordConfirmationRef =  useRef<HTMLInputElement | null>(null);

    // Error message handler 

    const [errors, setErrors] = useState({
      FName:'',
      LName:'',
      Phone:'',
      Brithday:'',
      CIN:'',
      email:'',
      password:'',
      PasswordConfirmation:''
    });

  // modal switcher 

  const SwitchModal =()=>{
    handleSwitcher('Login')
  }

//  chack all inputs validation

  const CheckInputsValidation = ()=>{
    const errors = {
      FName:'',
      LName:'',
      Phone:'',
      Brithday:'',
      CIN:'',
      email:'',
      password:'',
      PasswordConfirmation:''
    };
    
    const Email: string | null = getFieldValue(emailRef);
    const Password: string|null = getFieldValue(passwordRef);
    const FirstName : string|null = getFieldValue(FNameRef);
    const LastName: string|null = getFieldValue(LNameRef);
    const Phone: string|null = getFieldValue(PhoneRef);
    const BrithdayDate: any = getFieldValue(BrithdayRef);
    const CIN: string|null = getFieldValue(CINRef);
    const PasswordConfirmation:string|null = getFieldValue(PasswordConfirmationRef);

    function getFieldValue(ref: React.RefObject<HTMLInputElement>): string | null {
      return ref.current?.value ?? null;
    }

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
    if (Password !== PasswordConfirmation) {
      errors.PasswordConfirmation = "Please Confirme your Password"
    }
    // Validate other inputes
    !FirstName?errors.FName = "FName is required":''
    !LastName?errors.LName = "LName is required":''
    !Phone?errors.Phone = "Phone is required":''
    !BrithdayDate?errors.Brithday = "Brithday is required":''
    !CIN?errors.CIN = "CIN is required":''

    if (!Object.values(errors).some(v=>v)) {
      // Form is valid, submit it
      setErrors(errors);      
      const dateObj = new Date(BrithdayDate);
      const Birthday = dateObj.toISOString().toString();
      
      return{
        Email,
        Password,
        FirstName,
        LastName,
        ProfilePicUrl,
        Phone,
        Birthday,
        CIN
      }

    } else {      
      // Form is invalid, update state with errors
      setErrors(errors);
      return false
    }
  }
  // const apiKey = process.env.REACT_APP_API_URL
  // submit form handler 
  const handleSubmit = ()=>{
    // console.log(apiKey);
    
    const formData :any= CheckInputsValidation()
    if (formData) {
      dispatch(register(formData))
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
          <Typography  align="center" sx={isMobile?{fontSize:'20px'}:{fontSize:'26px'}}>
            We Are Glad To welcome You
          </Typography>
          {
            isLoading?
            <Typography  align="center" sx={isMobile?{fontSize:'20px'}:{fontSize:'26px'}}>
              Please wait ...
            </Typography>:
            <form onSubmit={e => e.preventDefault()}>
              <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <TextField
                  label="First Name"
                  type="text"
                  inputRef={FNameRef}
                  error={!!errors.FName}
                  helperText={errors.FName}
                  fullWidth
                  sx={{margin:1}}
                />
                <TextField
                  label="Last Name"
                  type="text"
                  inputRef={LNameRef}
                  error={!!errors.LName}
                  helperText={errors.LName}
                  fullWidth
                  sx={{margin:1}}
                />
              </Box>
              <Box sx={!isMobile?{display:'flex',justifyContent:'space-between',alignItems:'center'}:{}}>
                <TextField
                  label="Email"
                  type="email"
                  inputRef={emailRef}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                  sx={{margin:1}}
                />
                <TextField
                  label="Phone"
                  type="text"
                  inputRef={PhoneRef}
                  error={!!errors.Phone}
                  helperText={errors.Phone}
                  fullWidth
                  sx={{margin:1}}
                />
              </Box>
              <Box sx={!isMobile?{display:'flex',justifyContent:'space-between',alignItems:'center'}:{}}>
                <TextField
                  label="Brithday"
                  type="date"
                  inputRef={BrithdayRef}
                  error={!!errors.Brithday}
                  helperText={errors.Brithday}
                  fullWidth
                  sx={{margin:1}}
                />
                <TextField
                  label="CIN"
                  type="text"
                  inputRef={CINRef}
                  error={!!errors.CIN}
                  helperText={errors.CIN}
                  fullWidth
                  sx={{margin:1}}
                />
              </Box>
              <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <TextField
                  label="Password"
                  type="password"
                  inputRef={passwordRef}
                  error={!!errors.password}
                  helperText={errors.password}
                  fullWidth
                  sx={{margin:1}}
                />
                <TextField
                  label="Password Confirmation"
                  type="password"
                  inputRef={PasswordConfirmationRef}
                  error={!!errors.PasswordConfirmation}
                  helperText={errors.PasswordConfirmation}
                  fullWidth
                  sx={{margin:1}}
                />
              </Box>
              
            <Button component="span" variant="text" sx={{width:'100%',justifyContent:'end'}} onClick={SwitchModal}>
              Aleady a member 
            </Button>
            <Box sx={{display:'flex',width:'100%',justifyContent:'space-around'}}>
              <PrimaryButton title="Register" onClick={()=>handleSubmit()} width="140px" height="45px"/>
              <Button component="span" variant="text" onClick={() => handleClose()}>
                Cancel
              </Button>
            </Box>
            </form>
          }
          </Paper>
        </Grid>
      </Grid>
      </Modal>
    );
  };

export default RegisterModal;
