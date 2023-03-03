import React from 'react'
import ProfileInfo from '../../components/userComponents/ProfileInfo'
import ProfileStatistics from '../../components/userComponents/ProfileStatistics'
const ProfileUser = () => {
  return (
    <div className=" container mx-auto my-5 p-5 md:flex no-wrap md:-mx-2 ">
        <ProfileInfo/>
        <ProfileStatistics/>
    </div>

  )
}

export default ProfileUser