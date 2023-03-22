import { useState,useEffect } from "react";
import { storage } from "../../utils/Firebase/Firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CircularProgress from '@mui/material/CircularProgress';
import jwt_decode from 'jwt-decode';
import { Box,useTheme,Typography} from "@mui/material";

import axios from "axios";
import dayjs from "dayjs";

import { useSelector } from "react-redux";
import { User } from "../../types/user.js";

const ProfileInfo = () => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentUser,setCurrentUser] = useState<User>({})
  const apiUrl = import.meta.env.VITE_API_URL;
  const {user}= useSelector((state:any)=>state.auth)

  const token:string = user?.LoggedUser?.token
  const decodedToken:{id:string} = jwt_decode(token);
  const id = decodedToken?.id; 


  useEffect(()=>{
    getUserInfo()
  },[])
  const getUserInfo = async()=>{
    if (id) {
        await axios(`${apiUrl}/users/${id}`)
        .then((res)=>{
            setCurrentUser(res.data.user)
            if (!url) {
                setUrl(res.data.user.ProfilePicUrl)
            }
        })
        .catch((err)=>console.log(err.message))
    }    
  }

  const handleProfileUploader = () => {
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
            updateUserInfo(url)
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => console.log(err));
  };

  const updateUserInfo = async(url:string)=>{
    const formData = {
        id:id,
        ProfilePicUrl:url
    }    
    await axios.put(`${apiUrl}/users/UpdateUser`,formData,{
        headers: {
            'Authorization': 'Bearer ' + user.LoggedUser.token,
        },
    })
    .then(res=>console.log(res.data))
    .catch((err) => console.log(err));
  }

  return (
    <div className="w-full md:w-3/12 md:mx-2">
      <div className="bg-white p-3 shadow-md rounded-xl">
        <div className="image overflow-hidden flex flex-col items-center justify-center">
            <Box sx={{display:'flex',position:'relative',width:'100%',justifyContent:'center',alignItems:'center'}}>
                <Avatar alt="User Avatar" src={url} sx={{width:'100px',height:'100px'}}/>
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
                {
                    profilePic &&
                    <Button
                    variant="contained"
                    component="label"
                    onClick={handleProfileUploader}
                    sx={{marginTop:3}}
                    >
                        Update
                    </Button>
                }


        </div>
        <div className="text-center py-4">
          <h1 className="text-gray-900 font-bold self-center text-xl leading-8 my-1">
            {currentUser.FirstName} {currentUser.LastName}
          </h1>
        </div>
        <hr />
        <div className="flex flex-col justify-around text-gray-500">
          <div className="p-2">
            <p className="text-xs">Email</p>
            <p>{currentUser.Email}</p>
          </div>
          <div className="p-2">
            <p className="text-sm">Phone</p>
            <p>{currentUser.Phone}</p>
          </div>
          <div className="p-2">
            <p className="text-sm">Birthday </p>
            <p>{dayjs(currentUser.Birthday).format('DD/MM/YYYY')}</p>
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
                <span className="ml-auto">{dayjs(currentUser.createdAt).format('DD/MM/YYYY')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileInfo;
