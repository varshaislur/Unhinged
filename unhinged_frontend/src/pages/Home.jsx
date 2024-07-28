import React from 'react'
import { useSelector } from 'react-redux'
import TopBar from '../components/TopBar'
import ProfileCard from '../components/ProfileCard'

const Home = () => {
  const {user} =useSelector((state)=>state.user)
  console.log(user)
  
  return (
    <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
      <TopBar/>
      {/* Left */}
      <div className='hidden w--1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
      <ProfileCard user={user}/>

      </div>
      {/* center */}

      <div>

      </div>
      {/* right */}
      <div>

      </div>
    </div>
  )
}

export default Home