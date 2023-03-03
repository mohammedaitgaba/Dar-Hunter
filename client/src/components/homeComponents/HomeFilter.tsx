import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import PrimaryButton from '../global/buttons/PrimaryButton';


const HomeFilter = () => {
  const [age, setAge] = React.useState('');
  const [PriceRange, setPriceRange] = React.useState<number[]> ([1000, 8000]);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const minPrice = 0;

  const handlePriceRange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPriceRange([Math.min(newValue[0], PriceRange[1] - minPrice), PriceRange[1]]);
    } else {
      setPriceRange([PriceRange[0], Math.max(newValue[1], PriceRange[0] + minPrice)]);
    }
  };
  const FilterPosts =()=>{
    console.log('filtred posts');
    
  }

  const PrettoSlider = styled(Slider)({
    color: '#000080',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 14,
      background: 'unset',
      padding: 0,
      width: 35,
      height: 35,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#050401',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });


  return (
    <div className='bg-white rounded-xl flex flex-col w-full self-center p-6 shadow-lg absolute bottom-4'>
        <h3 className='font-semibold text-2xl pb-5'>Search For Available Properties</h3>
        <div className='flex flex-wrap  justify-center sm:justify-between'>
          <FormControl sx={{ m: 1, minWidth: 220  }}>
            <InputLabel id="demo-select-small">City</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="demo-select-small">Sector</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={age}
              label="Sector"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>       
          
          <FormControl sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="demo-select-small">Property Type</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={age}
              label="Property Type"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="demo-select-small">Transaction Type</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={age}
              label="Transaction Type"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <div className='w-62 border p-3 m-3'>
            <div className='flex'>
              Price From : &nbsp;
             <p className='font-semibold'>{PriceRange[0]} DH </p> &nbsp; To : <p className='font-semibold'> {PriceRange[1]} DH</p> 
            </div>
            <PrettoSlider
              value={PriceRange}
              onChange={handlePriceRange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={1000}
              max={10000}
              style={{ pointerEvents: 'auto' }}
              />
          </div>
        </div>
        <div className='self-center'>
          <PrimaryButton title='Search' onClick={()=>FilterPosts()} width="150px" height="55px"/>
        </div>
    </div>
  )
}

export default HomeFilter