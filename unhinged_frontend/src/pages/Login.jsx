import React from 'react'
import { TbSocial } from 'react-icons/tb'
import TextInput from '../components/TextInput'

const Login = () => {
  return (
    <div className='bg-bgColor h-[100vh] flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-xl'>
        {/* Left */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center'>
          <div className='w-full flex gap-2 items-center mb-6'>
            <div className='p-2 bg-blue rounded text-white'>
              <TbSocial />
            </div>
            <span className='text-2xl text-blue font-semibold'>
              Unhinged
            </span>
          </div>
        </div>
        <p className='text-ascent-1 text-base font-semibold'>
        Login to your account
        </p>
        <span className='text-sm mt-2 text-ascent-2'>
Welcome
        </span>
        <form className='py-8 flex flex-col gap-5' >
         <TextInput></TextInput>
        </form>
        </div>
        {/* Right */}
      
    </div>
  )
}

export default Login