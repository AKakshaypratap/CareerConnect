import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_ENDPOINT } from '../utils/constant'
import axios from 'axios'
import { toast } from 'sonner'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: ''
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('fullname', input.fullname)
    formData.append('email', input.email)
    formData.append('phoneNumber', input.phoneNumber)
    formData.append('password', input.password)
    formData.append('role', input.role)
    if(input.file){
      formData.append('file', input.file)
    }

    try{
      const response = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })
      if(response.data.success){
        toast.success(response.data.message)
        navigate('/login')
      }
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center max-w-7xl mx-auto'>
      <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
        <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
        <div className='my-4'>
          <Label>Full Name</Label>
          <Input
            type='text'
            placeholder='Enter your name'
            name='fullname'
            value={input.fullname}
            onChange={handleChange}
            className='mt-2' />
        </div>
        <div className='my-4'>
          <Label>Email</Label>
          <Input
            type='email'
            placeholder='Enter your email'
            name='email'
            value={input.email}
            onChange={handleChange}
            className='mt-2' />
        </div>
        <div className='my-4'>
          <Label>Phone Number</Label>
          <Input
            type='text'
            placeholder='Enter your phone number'
            name='phoneNumber'
            value={input.phoneNumber}
            onChange={handleChange}
            className='mt-2'
          />
        </div>
        <div className='my-4'>
          <Label>Password</Label>
          <Input
            type='password'
            placeholder='Enter your password'
            name='password'
            value={input.password}
            onChange={handleChange}
            className='mt-2' />
        </div>
        <div className='flex items-center justify-between'>
          <RadioGroup className='flex items-center gap-4 my-4'>
            <div className="flex items-center space-x-2">
              <Input
                type='radio'
                name='role'
                value='student'
                checked={input.role === 'student'}
                onChange={handleChange}
                className='cursor-pointer'
              />
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type='radio'
                name='role'
                value='recruiter'
                checked={input.role === 'recruiter'}
                onChange={handleChange}
                className='cursor-pointer'
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>
          <div>
            <Label>Profile</Label>
            <Input
              accept='image/*'
              type='file'
              onChange={changeFileHandler}
              className='cursor-pointer mt-2'
            />
          </div>
        </div>
        <Button type='submit' className='w-full my-6'>Sign Up</Button>
        <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-500'>Login</Link></span>
      </form>
    </div>
  )
}

export default Signup