import React from 'react'

const ProfileStatistics = () => {
  return (
    <div className='flex flex-col justify-between lg:w-8/12 lg:ml-4 mt-4 lg:mt-0'>
        <div className='w-full rounded-xl p-4 shadow-md'>
            <p>About Properties</p>
            <div className='flex flex-wrap justify-around'>
              <div className='flex flex-col items-center'>
                  <div className='flex border w-20 h-20 rounded-[50%] items-center justify-center text-4xl text-slate-500'>4</div>
                  <p className='lg:text-lg'>Total Properties</p>
              </div>
              <div className='flex flex-col items-center'>
                  <div className='flex border w-20 h-20 rounded-[50%] items-center justify-center text-4xl text-slate-500'>4</div>
                  <p className='lg:text-lg'>Properties Sold</p>
              </div>
              <div className='flex flex-col items-center'>
                  <div className='flex border w-20 h-20 rounded-[50%] items-center justify-center text-4xl text-slate-500'>4</div>
                  <p className='lg:text-lg'>Properties on Sell</p>
              </div>
            </div>
        </div>
        <div className='w-full shadow-md rounded-xl p-4 mt-4'>
            <p>Time</p>
            <div className='flex justify-around'>
              <div className='text-center'>
                  <div className='flex border w-20 h-20 rounded-[50%] items-center justify-center text-4xl text-slate-500'>4</div>
                  <p className='text-xl'>hasss</p>
              </div>
              <div className='text-center'>
                  <div className='flex border w-20 h-20 rounded-[50%] items-center justify-center text-4xl text-slate-500'>4</div>
                  <p className='text-xl'>hasss</p>
              </div>
              <div className='text-center'>
                  <div className='flex border w-20 h-20 rounded-[50%] items-center justify-center text-4xl text-slate-500'>4</div>
                  <p className='text-xl'>hasss</p>
              </div>
            </div>
        </div>
        <div className='w-full shadow-md rounded-xl p-4 mt-4'>
            <p>Time</p>
            <div className='flex justify-around'>
              <div className='text-center'>
                  <div className='flex border w-20 h-20 rounded-[50%] items-center justify-center text-4xl text-slate-500'>4</div>
                  <p className='text-xl'>hasss</p>
              </div>
              <div className='text-center'>
                  <div className='flex border w-20 h-20 rounded-[50%] items-center justify-center text-4xl text-slate-500'>4</div>
                  <p className='text-xl'>hasss</p>
              </div>
              <div className='text-center'>
                  <div className='flex border w-20 h-20 rounded-[50%] items-center justify-center text-4xl text-slate-500'>4</div>
                  <p className='text-xl'>hasss</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileStatistics