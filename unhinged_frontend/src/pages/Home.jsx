import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { friends , requests ,suggest } from '../assets/data'
import TopBar from '../components/TopBar'
import ProfileCard from '../components/ProfileCard'
import FriendsCard from '../components/FriendsCard'
import userProfile from '../assets/userprofile.png'
import {Link} from 'react-router-dom'
import CustomButton from '../components/CustomButton'

const Home = () => {
  const [friendRequest,setFriendRequest]= useState(requests)
  const [suggestedFriends,setSuggestedFriends]=useState(suggest)
  const {user} =useSelector((state)=>state.user)
  console.log(user)
  console.log(friendRequest) 


  return (
    <div className='home  w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
      <TopBar/>
      <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>

      
      {/* Left */}
      <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
      <ProfileCard user={user}/>
      <FriendsCard friends={user?.friends}/>

      </div>
      {/* center */}

      <div className=' flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto'>


      </div>
      {/* right */}
      <div className='hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto'>
            {/* FRIEND REQUEST */}
            <div className='w-full bg-primary shadow-sm rounded-lg px-6 py-5'>
              <div className='flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]'>
                <span> Friend Request </span>
                <span>{friendRequest?.length}</span>
              </div>
              <div className='w-full flex flex-col gap-4 pt-4 '>
                {
                  friendRequest?.map(({_id,requestFrom:from, })=>(
                    <div key={_id} className='flex items-center justify-between'>
                      <Link to={"/profile/"+ from._id} className="w-full flex gap-4 items-center cursor-pointer">
                      <img src={from?.profileUrl ?? userProfile } alt="profile" className='w-10 h-10 object-cover rounded-full'/>
                      <div className='flex-1'>
                        <p className='text-base font-medium text-ascent-1'>
                          {from?.firstName} {from?.lastName}

                        </p>
                        <span className='text-sm text-ascent-2'>
                          {
                            from?.profession ?? "No Profession"
                          }

                        </span>

                      </div>
                      </Link>
                      <div className='flex gap-1'>
                        <CustomButton 
                        title="Accept"
                        containerStyles="bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full"


                        />
                        <CustomButton 
                        title="Deny"
                        containerStyles="border border-[#808080]  text-xs text-white px-1.5 py-1 rounded-full"
                        

                        />

                      </div>

                      </div>
                  ))
                }

              </div>


      </div>
      {/* suggested friend */}
      <div className='w-full bg-primary shadow-sm '>

      </div>
      </div>
      </div>
    </div>
  )
}

export default Home