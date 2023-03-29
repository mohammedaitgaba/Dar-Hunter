import React,{useEffect} from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const StepperForm = (data:any) => {
    const steps = ['Step 1', 'Step 2', 'Step 3'];
    
  return (
    <Stepper activeStep={data.step}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperForm;
