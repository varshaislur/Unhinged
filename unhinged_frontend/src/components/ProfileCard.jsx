import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import userProfile from '../assets/userprofile.png'
import { LiaEditSolid } from 'react-icons/lia';
import { BsPersonFillAdd } from 'react-icons/bs';
import { updateProfile } from '../redux/userSlice';

const ProfileCard = ({user}) => {
    const {user:data,edit }=useSelector((state)=>state.user);
    const dispatch = useDispatch();
    console.log(user)
    console.log(data)

  return (

    <div>
        <div className='w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4 my-10'>
            <div className='w-full flex items-center justify-between border-b pb-5 border-[#66666645]'>
                <Link to={"/profile/"+user?._id} className="flex flex-row gap-2">
                <img src={user?.profileUrl ?? userProfile} alt={user?.email} className='w-14 h-14 object-cover rounded-full'/>
                <div className='flex flex-col justify-center '>
                    <p className='text-lg font-medium text-ascent-1'>
                        {user?.firstName}  {user?.lastName}
                    </p>
                    <span className='text-ascent-2'>
                        {user?.profession ?? "No profession"}
                    </span>
                </div>
                </Link>

                <div className=''>
                    {user?._id === data?._id ? ( <LiaEditSolid
                size={22}
                className='text-blue cursor-pointer'
                onClick={() => dispatch(updateProfile(true))}
              />) : (<button
                className='bg-[#0444a430] text-sm text-white p-1 rounded'
                onClick={() => {}}
              >
                <BsPersonFillAdd size={20} className='text-[#0f52b6]' />
              </button>) }
                </div>

            </div>
            <div className="w-full flex flex-col gap-2 py-4 border-b vorder-[#66666645]">
                <div className='flex gap-2 items-center text-ascent-2'>
                    

                </div>

            </div>
        </div>
    </div>
  )
}

export default ProfileCard