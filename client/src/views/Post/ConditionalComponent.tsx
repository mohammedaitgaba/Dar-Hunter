import { useState } from "react";
import { PostData } from "../../types/post";

import FirstAddPost from "../../components/postComponents/FirstAddPost";
import SecondAddPost from "../../components/postComponents/SecondAddPost";
import ThirdAddPost from "../../components/postComponents/ThirdAddPost";
import { Box } from "@mui/material";

const Form = (page: { step: number }) => {
  const [postData, setPostData] = useState<PostData>({
    _id: "",
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
  });
  const conditionalComponent = () => {
    switch (page.step) {
      case 0:
        return <FirstAddPost postData={postData} setPostData={setPostData} />;
      case 1:
        return <SecondAddPost postData={postData} setPostData={setPostData} />;
      case 2:
        return <ThirdAddPost postData={postData} setPostData={setPostData} />;
      default:
        return <FirstAddPost postData={postData} setPostData={setPostData} />;
    }
  };
  return <Box>{conditionalComponent()}</Box>;
};
export default Form;
