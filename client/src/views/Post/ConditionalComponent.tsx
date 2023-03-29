import FirstAddPost from "../../components/postComponents/FirstAddPost";
import SecondAddPost from "../../components/postComponents/SecondAddPost";
import ThirdAddPost from "../../components/postComponents/ThirdAddPost";
import { Box } from "@mui/material";

const Form = (page: { step: number }) => {
  const conditionalComponent = () => {
    switch (page.step) {
      case 0:
        return <FirstAddPost/>;
      case 1:
        return <SecondAddPost/>;
      case 2:
        return <ThirdAddPost/>;
      default:
        return <FirstAddPost/>;
    }
  };
  return <Box>{conditionalComponent()}</Box>;
};
export default Form;
