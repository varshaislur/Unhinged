import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { friends , requests ,suggest,posts } from '../assets/data'
import TopBar from '../components/TopBar'
import ProfileCard from '../components/ProfileCard'
import FriendsCard from '../components/FriendsCard'
import userProfile from '../assets/userprofile.png'
import {Link} from 'react-router-dom'
import CustomButton from '../components/CustomButton'
import { BsFiletypeGif, BsPersonFillAdd } from 'react-icons/bs'
import TextInput from '../components/TextInput'
import { useForm } from 'react-hook-form'
import { BiImages, BiSolidVideo } from 'react-icons/bi'
import Loading from '../components/Loading'
import PostCard from '../components/PostCard'

const Home = () => {
  const [friendRequest,setFriendRequest]= useState(requests)
  const [suggestedFriends,setSuggestedFriends]=useState(suggest)
  const [posting,setPosting]=useState(false)
  const [errMsg,setErrMsg]=useState("")
  const [loading,setLoading]=useState(false)

  const {user} =useSelector((state)=>state.user)
  console.log(user)
  console.log(friendRequest) 
  const{register, handleSubmit,formState:{errors}}=useForm();
  const [file,setFile]=useState(null)


  const handlePostSubmit= async(data) => {

  }
  
  const handleFriendRequest= async(data)=>{

  }


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

      <div className=' flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto rounded'>
        <form onSubmit={handleSubmit(handlePostSubmit)} className='bg-primary px-4 rounded-lg'>
          <div className='w-full flex items-center gap-2 py-4 border-b border-[#66666645]'>
            <img src={user?.profileUrl ?? userProfile} alt="alternate"
            className='w-14 h-14 rounded-full object-cover ' />
            <TextInput styles='w-full rounded-full py-5'
            placeholder="whats on your mind today"
            name='description'
            register={register("description",{
              required:"Write something about post"
            })}
            error={errors.description? errors.description.message : ""}
            />

          </div>
          {errMsg?.message && (
                        <span role='alert' className={`text-sm ${errMsg?.status == "failed" ? "text-[#f64949fe]" :"text-[#2ba150fe]"}`}>
                          {errMsg?.message}

                        </span>
                      )}
                      <div className='flex items-center justify-between py-4'>
                        <label 
                        htmlFor='imgUpload'
                        className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'>
                            <input type="file"
                            onChange={(e)=> {setFile(e.target.files[0]); console.log(file)}} 
                            className='hidden'
                            id='imgUpload'
                            data-max-size='5120'
                            accept='.jpg, .png, .jpeg'/>
                            <BiImages/>
                            <span>Image</span>

                        </label>
                        <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                  htmlFor='videoUpload'
                >
                  <input
                    type='file'
                    data-max-size='5120'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='videoUpload'
                    accept='.mp4, .wav'
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>

                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                  htmlFor='vgifUpload'
                >
                  <input
                    type='file'
                    data-max-size='5120'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='vgifUpload'
                    accept='.gif'
                  />
                  <BsFiletypeGif />
                  <span>Gif</span>
                </label>
                <div>
                  {posting? <Loading/> :
                  <CustomButton
                  type="submit"
                  title="post"
                  containerStyles='bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm'/>

                  }

                </div>

                      </div>
        </form>

        {loading ? (<Loading/>):posts?.length> 0 ?(posts.map((post)=>(
          <PostCard key={post?._id} post={post}
          user={user}
          delete={()=>{}}
          likePost={()=>{}}/>
        ))) : (
          <div className='flex w-full h-full items-center justify-center'>
            <p className='text-lg text-ascent-2'>
              No Post Available
            </p>

          </div>
        )}

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
      <div className='w-full bg-primary shadow-sm rounded-lg px-5 py-5 '>
        <div className='flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]'>
       <span>
        Suggested Friends 
       </span>

        </div>
        <div className='w-full flex flex-col gap-4 pt-4'>
          {
            suggestedFriends.map((friend)=>(
              <div className='flex items-center justify-between'
              key={friend?._id}>
                <Link to={"/profile/"+friend?._id}
                 key={friend._id}
                 className='w-full flex gap-4 items-center cursor-pointer'>
                  <img src={friend?.profileUrl ?? userProfile} alt={friend?.firstName}
                  className='w-10 h-10 object-cover rounded-full' />
                  <div className='flex-1'>
                    <p className='text-base font-medium text-ascent-1'>
                      {friend?.firstName} {friend?.lastName}

                    </p>
                    <span className='text-sm text-ascent-2'>
                      {friend?.profession ?? "No Profession"}

                    </span>

                  </div>

                </Link>
                <div className="flex gap-1">
                  <button className='bg-[#0444a430] text-sm text-white p-1 rounded' onClick={()=>handleFriendRequest(friend?._id)}>
                    <BsPersonFillAdd size={20 } className="text-[#0f552b6]"></BsPersonFillAdd>
                    

                  </button>

                </div>

              </div>
            ))
          }

        </div>

      </div>
      </div>
      </div>
    </div>
  )
}

export default Home