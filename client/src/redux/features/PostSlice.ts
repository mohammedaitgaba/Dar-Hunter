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
      Pics: []
    },
  };

const postDataSlice = createSlice({
  name: "postData",
  initialState,
  reducers: {
    updatePostData: (state, action) => { 
      state.postData = { ...state.postData, ...action.payload };
    },
  },
});

export const { updatePostData } = postDataSlice.actions;
export default postDataSlice.reducer;
