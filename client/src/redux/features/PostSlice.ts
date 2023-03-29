import { createSlice } from "@reduxjs/toolkit";
import { PostData } from "../../types/post";

const initialState = {
    postData: {
      Title: "",
      Description: "",
      Price: 0,
      PropertyType: "",
      TransactionType: "",
      City: "",
      Sector: "",
      Location: [
        {
          lang: 0,
          latit: 0,
        },
      ],
      Details: [
        {
          Rooms: 0,
          Surface: 0,
          floors: 0,
        },
      ],
      Pics: {
        url: "",
      },
    },
  };

const postDataSlice = createSlice({
  name: "postData",
  initialState,
  reducers: {
    setPostData: (state, action) => {
      return action.payload;
    },
    updatePostData: (state, action) => { 
      
      state.postData = { ...state.postData, ...action.payload };
      console.log(state.postData,"state.postData ");
    },
  },
});

export const { setPostData,updatePostData } = postDataSlice.actions;
export default postDataSlice.reducer;
