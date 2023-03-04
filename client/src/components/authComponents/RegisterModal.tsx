import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';

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
  width: 400,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
}));

const RegisterModal = ({ open, handleClose,handleSwitcher }:ModalProps) => {
    const theme = useTheme();
  
    const SwitchModal =()=>{
      handleSwitcher('Login')
  }
  
    return (
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Paper>
          <h2 id="modal-title">Register</h2>
          <p id="modal-description">
            This is the registration form.
          </p>
          <Button variant="contained" color="primary" onClick={() => handleClose()}>
            Register
          </Button>
          <Button variant="contained" color="secondary" onClick={SwitchModal}>
            Login Instead
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleClose()}>
            Cancel
          </Button>
        </Paper>
      </Modal>
    );
  };

export default RegisterModal;
