import { useState } from "react";
import HorizontalLinearStepper from "../../components/postComponents/HorizontalLinearStepper";
import Form from "./ConditionalComponent";
import PrimaryButton from "../../components/global/buttons/PrimaryButton";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const AddPost = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const postData = useSelector((state: any) => state.postData.postData);
  const {user}= useSelector((state:any)=>state.auth)
  const navigate = useNavigate();

  let notValid:boolean = true

  const apiUrl = import.meta.env.VITE_API_URL;

  // get data from the store to check it if its valid 
  const {
    Title,
    Description,
    Price,
    PropertyType,
    TransactionType,
    City,
    Sector,
    Details,
    Pics,
  } = postData;


  // check if all the steps is valid by checking on each step 
  const firstStepInputs = {
    Title,
    Description,
    Price,
    PropertyType,
    TransactionType,
  };
  const secondStepInputs = {
    City,
    Sector,
  }
  const tirdStepValidation = {
    Details,
    Pics,
  }
  // get id and token from user state so we can pass it with req

  const token:string = user?.LoggedUser?.token
  const decodedToken:{id:string} = jwt_decode(token);
  const id = decodedToken?.id; 
  
  
  const handleNext = () => {
    if (activeStep === 0) {
        notValid = Object.values(firstStepInputs).some((v) => !v)
    }
    if (activeStep === 1) {
        notValid = Object.values(secondStepInputs).some((v) => !v)
    }
    if (activeStep === 2) {
        notValid = Object.values(tirdStepValidation).some((v) => !v)
    }
    notValid ? setError("All feilds are required ! ") : setError("");    
    
    if (activeStep <= 2 && !notValid) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        notValid = true
        console.log(!notValid , "fddfdddddd");
    }
};

const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };
  const handleSubmit = () => {
    const formData = {...postData,Maker:id}
    notValid = Object.values(tirdStepValidation).some((v) => !v)
    notValid ? setError("All feilds are required ! ") : setError("");
    if (!notValid) {
      axios.post(`${apiUrl}/posts/NewPost`,formData)
      .then(res=>{
        toast.success(`${res.data.message}`)
        navigate('/')
      })
      .catch(err=>{
        toast.error(`Data error  ${err.message}`)
      }) 
    }

  };
  return (
    <div className="py-24 px-12 flex flex-col items-center justify-center">
      <div className="md:w-8/12 w-full ">
        <HorizontalLinearStepper step={activeStep} />
      </div>
      <div className="md:w-10/12 w-full ">
        <Form step={activeStep} />
      </div>
      {error && <div className="text-red-500 p-2">{error}</div>}

      <div className="flex justify-between items-center mt-4 md:w-10/12 w-full ">
        {activeStep > 0 ? (
          <PrimaryButton
            title="Back"
            onClick={() => handleBack()}
            width="120px"
            height="40px"
          />
        ) : null}
        {activeStep < 2 ? (
          <PrimaryButton
            title="Next"
            onClick={() => handleNext()}
            width="120px"
            height="40px"
          />
        ) : null}
        {activeStep >= 2 ? (
          <PrimaryButton
            title="Submit"
            onClick={() => handleSubmit()}
            width="120px"
            height="40px"
          />
        ) : null}
      </div>
    </div>
  );
};

export default AddPost;

