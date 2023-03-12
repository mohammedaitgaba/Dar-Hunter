import React, { useState } from 'react';
import styled from 'styled-components';

import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SliderContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  display:flex
`;

const Slider = styled(Box)<{ slideCount: number, currentSlide: number }>`
  display: flex;
  width: calc(100%);
  transition: transform 0.5s ease-in-out;
  transform: translateX(calc(-100% * ${({ currentSlide }) => currentSlide}));
`;

const Slide = styled.img`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const SliderControls = styled(Box)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
  z-index: 1;
`;

const ArrowButton = styled(IconButton)`
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
const ImageSlider= (imagesArr:{data:string[]}) => {
    const images:string[] = imagesArr.data
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleSlideChange = (delta: number) => {
    console.log(delta);
    
    setCurrentSlide((prevSlide) =>
      Math.max(0, Math.min(images.length - 1, prevSlide + delta))
    );
  };

  return (
    <SliderContainer>
      <Slider currentSlide={currentSlide} slideCount={images.length}>
        {images.map((image:string, index:number) => (
          <Slide key={index} src={image} alt={`Slide ${index + 1}`} />
        ))}
      </Slider>
      <SliderControls>
        <ArrowButton
          aria-label="previous slide"
          onClick={() => handleSlideChange(-1)}
          disabled={currentSlide === 0}
          sx={{backgroundColor:'grey'}}
        >
          <ArrowBackIosNewIcon />
        </ArrowButton>
        <ArrowButton
          aria-label="next slide"
          onClick={() => handleSlideChange(1)}
          disabled={currentSlide === images.length - 1}
          sx={{backgroundColor:'grey'}}
        >
          <ArrowForwardIosIcon />
        </ArrowButton>
      </SliderControls>
    </SliderContainer>
  );
};

export default ImageSlider;
