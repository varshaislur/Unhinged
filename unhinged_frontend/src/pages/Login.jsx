import React, { useState } from 'react'
import { TbSocial } from 'react-icons/tb'
import TextInput from '../components/TextInput'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ 
    mode: "onChange",
  });
  const [errMsg,setErrMsg]=useState("")
  const [isSubmitting,setIsSubmitting]=useState(false)
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
          <form className='py-8 flex flex-col gap-5' >
            <TextInput name='email'
              placeholder='email@example.com'
              label='Email Address'
              type='email'
              register={register("email", {
                required: "Email Address is required",
              })}
              styles='w-full rounded-xl'
              labelStyle='ml-2'
              error={errors.email? errors.email.message:""}></TextInput>
              <TextInput name='password'
              placeholder='12345678'
              label='Password'
              type='password'
              register={register("password", {
                required: "Password is required",
              })}
              styles='w-full rounded-xl'
              labelStyle='ml-2'
              error={errors.email? errors.email.message:""}>

              </TextInput>
              <Link to="/reset-password" className="text-sm text-right text-blue font semibold" >Forgot Password?</Link>
              {errMsg?.message && (<span className={`text-sm ${errMsg?.status == "failed"? "text-[#f64949fe]" : "text-[#2ba150fe]"}`}>{errMsg?.message}</span>)}
              {
                isSubmitting ? <Loading/> :<CustomButton/>
              }
          </form>
        </div>
        {/* Right */}

      </div>
    </div>
  )
}

export default Login