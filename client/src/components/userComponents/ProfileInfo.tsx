import { useState } from "react";
import { storage } from "../../utils/Firebase/Firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CircularProgress from '@mui/material/CircularProgress';
import { Box,useTheme,Typography} from "@mui/material";
import styled from 'styled-components';

const StyledAvatar = styled(Avatar)`
  &:hover {
    background-color: #fafafa;
    cursor: pointer;
    &::after {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        color: #555;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 8px;
        cursor: pointer;
      }
  }
`;

const ProfileInfo = () => {
    const theme = useTheme();
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [url, setUrl] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleProfileUploader = () => {
    console.log(profilePic)
    if (!profilePic) {
      return;
    }

    const time = new Date().getTime() / 1000;
    const imageRef = ref(storage, `ProfileImages/${profilePic.name + time}`);
    setIsLoading(true)
    uploadBytes(imageRef, profilePic)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setIsLoading(false)
            setUrl(url);
            setProfilePic(null)
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-full md:w-3/12 md:mx-2">
      <div className="bg-white p-3 shadow-md rounded-xl">
        <div className="image overflow-hidden flex flex-col items-center justify-center">
            <Box sx={{display:'flex',position:'relative',width:'100%',justifyContent:'center',alignItems:'center'}}>
                {/* <Avatar src={url} sx={{ width: 80, height: 80,alignSelf:'center'}} /> */}
                <StyledAvatar alt="User Avatar" src={url} sx={{width:'100px',height:'100px'}}/>
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                        sx={{position:'absolute',top:'0px',right:'0px'}}
                    >
                    <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setProfilePic(e.target.files?.[0])}
                        />
                        <PhotoCamera />
                    </IconButton>

                {
                    isLoading&&<CircularProgress sx={{position:'absolute'}}/>
                }
            </Box>
                <Typography> {profilePic?.name} </Typography>

          <Button
            variant="contained"
            component="label"
            onClick={handleProfileUploader}
            sx={{marginTop:3}}
          >
            Update
          </Button>

        </div>
        <div className="text-center py-4">
          <h1 className="text-gray-900 font-bold self-center text-xl leading-8 my-1">
            Jane Doe
          </h1>
        </div>
        <hr />
        <div className="flex flex-col justify-around text-gray-500">
          <div className="p-2">
            <p className="text-xs">Email</p>
            <p>medgaba@gmail.com</p>
          </div>
          <div className="p-2">
            <p className="text-sm">Phone</p>
            <p>0656514243</p>
          </div>
          <div className="p-2">
            <p className="text-sm">Birthday</p>
            <p>12/12/2000</p>
          </div>
          <div>
            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-3">
                <span>Status</span>
                <span className="ml-auto">
                  <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                    Active
                  </span>
                </span>
              </li>
              <li className="flex items-center py-3">
                <span>Member since</span>
                <span className="ml-auto">Nov 07, 2016</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileInfo;
