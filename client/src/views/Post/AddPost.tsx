import { useState } from 'react'
import HorizontalLinearStepper from '../../components/postComponents/HorizontalLinearStepper'
import Form from './ConditionalComponent';
const AddPost = () => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const handleNext = () => {
        if (activeStep<=2) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };
  
    const handleBack = () => {
        if (activeStep>0) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };
  return (
    <div className='py-24 px-12 flex flex-col items-center justifyContent-center'>
        <div className='md:w-8/12 w-full '>
            <HorizontalLinearStepper step={activeStep}/>
        </div>
        <div className='md:w-10/12 w-full '>
            <Form step={activeStep}/>
        </div>
        {
            activeStep<=2?
            <button onClick={handleNext}>next</button>:null
        }
        {
            activeStep>0?
            <button onClick={handleBack}>back</button>
            :null
        }
    </div>
  )
}

export default AddPost