import React, { useState } from 'react'
import { TbSocial } from 'react-icons/tb'
import TextInput from '../components/TextInput'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Loading from '../components/Loading'
import CustomButton from '../components/CustomButton'
import BgImg from '../assets/BgImg.png'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit =async(data)=>{
    console.log(data)
  }

  const [errMsg, setErrMsg] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()


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

          <p className='text-ascent-1 text-base font-semibold'>
            Login to your account
          </p>
          <span className='text-sm mt-2 text-ascent-2'>
            Welcome
          </span>
          <form className='py-8 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)} >
            <TextInput name='email'
              placeholder='email@example.com'
              label='Email Address'
              type='email'
              register={register("email", {
                required: "Email Address is required",
              })}
              styles='w-full rounded-xl'
              labelStyle='ml-2'
              error={errors.email ? errors.email.message : ""}></TextInput>
            <TextInput name='password'
              placeholder='12345678'
              label='Password'
              type='password'
              register={register("password", {
                required: "Password is required",
              })}
              styles='w-full rounded-xl'
              labelStyle='ml-2'
              error={errors.password ? errors.password.message : ""}>

            </TextInput>
            <Link to="/reset-password" className="text-sm text-right text-blue font semibold" >Forgot Password?</Link>
            {errMsg?.message && (<span className={`text-sm ${errMsg?.status == "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]"}`}>{errMsg?.message}</span>)}
            {
              isSubmitting ? <Loading /> : <CustomButton type='submit' containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`} title="Login" />
            }
          </form>
          <p className='text-ascent-2 text-sm text-center'>
            Don't have an account?
            <Link to='/register'
              className='text-[#065ad8] font-semibold ml-2 cursor-pointer'>Create an account</Link>
          </p>
        </div>
        {/* Right */}
        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue'>
          <div className='relative w-full flex items-center justify-center'>
            <img src={BgImg} alt="Bg Image" className='w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover' />

          </div>
          </div>
        </div>
      </div>
      )
}

      export default Login