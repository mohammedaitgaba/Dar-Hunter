import React from 'react'
import ProfileInfo from '../../components/userComponents/ProfileInfo'
import ProfileStatistics from '../../components/userComponents/ProfileStatistics'
const ProfileUser = () => {
  return (
    <div className="bg-white w-full mx-auto my-2 p-3 md:flex no-wrap md:-mx-2 ">
        <ProfileInfo/>
        <ProfileStatistics/>
    </div>

  )
}

export default ProfileUser