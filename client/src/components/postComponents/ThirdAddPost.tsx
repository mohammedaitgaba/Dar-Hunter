import {
  Box,
  Grid,
  TextField,
  Paper,
  Typography,
  ImageListItem,
  ImageList,
  Input,
  Button,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { updatePostData } from "../../redux/features/PostSlice";
import CircularProgress from '@mui/material/CircularProgress';


import { storage } from "../../utils/Firebase/Firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

type DetailsData = {
  Rooms: number;
  Surface: number;
  floors: number;
};

const ThirdAddPost = () => {
  const [images, setImages] = useState<File[]>([]);

  // const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [maxImagesError, setMaxImagesError] = useState<string>("");
  const postData = useSelector((state: any) => state.postData.postData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (images.length > 5) {
      setMaxImagesError("max pics allowed to upload is 5");
    } else {
      setMaxImagesError("");
    }
  }, [images]);
  
  
  useEffect(() => {
    console.log(postData);

  }, [postData]);
  const handleDetailsChange = (field: keyof DetailsData, value: number) => {
    dispatch(
      updatePostData({
        ...postData,
        Details: [
          {
            ...postData.Details[0],
            [field]: value,
          },
        ],
      })
    );
  };


  const imageUploader = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImages((prevState) => [...prevState, ...fileArray]);
    }
  };
  const removeImage = (image: any) => {
    const newImages = images.filter((img) => img !== image);
    setImages(newImages);
  };
  const handleimagesUploader = () => {
    if (!images) {
      return;
    }
    const time = new Date().getTime() / 1000;
    setIsLoading(true);
    const urls:[]|[string] = []; // create an empty array to store the URLs
    Promise.all(
      images.map((image) => {
        const imageRef = ref(storage, `PostsImages/${image.name + time}`);
        return uploadBytes(imageRef, image).then(() => {
          return getDownloadURL(imageRef).then((url) => {
            urls.push(url); // add the URL to the array
          });
        });
      })
    )
      .then(() => {
        dispatch(
          updatePostData({
            ...postData,
            Pics: [...postData.Pics, ...urls], // update the state with all the URLs
          })
        );
        setImages([]);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  

  return (
    <Box sx={{ flexGrow: 1, paddingTop: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box component={Paper} sx={{ p: 3, width: "100%" }}>
            <Typography sx={{ textAlign: "center" }}>Details</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                minHeight: "55vh",
              }}
            >
              <TextField
                name="Details[0].Surface"
                type="number"
                label="Surface"
                value={postData.Details[0].Surface}
                onChange={(event) =>
                  handleDetailsChange("Surface", Number(event.target.value))
                }
                fullWidth
                required
                sx={{ marginTop: 3 }}
              />

              <TextField
                name="Rooms"
                type="number"
                label="Rooms"
                value={postData.Details[0].Rooms}
                onChange={(event) =>
                  handleDetailsChange("Rooms", Number(event.target.value))
                }
                fullWidth
                required
                sx={{ marginTop: 3 }}
              />
              <TextField
                name="floors"
                type="number"
                label="floors"
                value={postData.Details[0].floors}
                onChange={(event) =>
                  handleDetailsChange("floors", Number(event.target.value))
                }
                fullWidth
                required
                sx={{ marginTop: 3 }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component={Paper}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "100%", height: "65vh", overflowY: "auto" }}>
              {images.length < 5 ? (
                <Input
                  type="file"
                  inputProps={{ multiple: true }}
                  onChange={imageUploader}
                />
              ) : null}
              <ImageList cols={3}>
                {images.map((image) => (
                  <ImageListItem
                    key={image.name}
                    onClick={() => removeImage(image)}
                  >
                      <div className="relative flex flex-wrap">
                        <img src={URL.createObjectURL(image)} alt={image.name} className="w-32 h-32"/>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-grey-200 text-red-500 font-bold cursor-pointer opacity-0 transition-opacity duration-200 hover:opacity-100">
                          X
                        </div>
                    </div>
                  </ImageListItem>
                ))}
              </ImageList>

              <Typography sx={{ color: "red" }}>
                {maxImagesError && maxImagesError}
              </Typography> 
                
              {
                isLoading?<CircularProgress />:null
              }
              {
                images&&
                <Button variant="outlined" onClick={handleimagesUploader} sx={{marginTop:3}}>Upload</Button>

              }
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThirdAddPost;
