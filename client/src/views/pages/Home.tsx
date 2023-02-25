import Button from "@mui/material/Button";
import React from "react";
import backgroundImage from "../../assets/bannerBackground.png";

const Home = () => {
  return (
    <div
      className="bg-center bg-cover h-screen flex flex-col justify-center items-start absolute w-full top-0"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="pl-24 flex flex-col items-start justify-start">
        <h1 className="text-7xl font-semibold text-white mb-4">
          Find A House <br /> That Suits You
        </h1>
        <h4 className="text-gray text-xl pb-8">
          Want to find or sell all whats related to real estate <br />
          You are in the right place 
        </h4>
        <Button variant="contained" sx={{color:'white', backgroundColor:'black',paddingLeft:5,paddingRight:5}}>Let's Go</Button>
        
        <div className="flex justify-around pt-8">
          <div className="px-4">
            <h3 className="font-bold text-2xl">2000+</h3>
            <p className="text-gray">Happy user</p>
          </div>          
          <div className="px-4">
            <h3 className="font-bold text-2xl">2000+</h3>
            <p className="text-gray">Happy user</p>
          </div>          
          <div className="px-4">
            <h3 className="font-bold text-2xl">2000+</h3>
            <p className="text-gray">Happy user</p>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default Home;
