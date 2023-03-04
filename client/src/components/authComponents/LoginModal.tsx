
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';

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
    const SwitchModal =()=>{
        handleSwitcher('Register')
    }
    return (
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Paper>
          <h2 id="modal-title">Login</h2>
          <p id="modal-description">
            This is the login form.
          </p>
          <Button variant="contained" color="primary" onClick={() => handleClose()}>
            Login
          </Button>
          <Button variant="contained" color="secondary" onClick={SwitchModal}>
            Register Instead
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleClose()}>
            Cancel          
            </Button>
        </Paper>
      </Modal>
    );
  };
  export default LoginModal