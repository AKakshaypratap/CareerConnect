import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_ENDPOINT } from '../utils/constant'
import axios from 'axios'
import { toast } from 'sonner'

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      if(response.data.success){
        toast.success(response.data.message)
        navigate('/')
      }else{
        toast.error(response.data.message)
      }
    }catch(error){
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className='flex items-center justify-center max-w-7xl mx-auto'>
      <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
        <h1 className='font-bold text-xl mb-5'>Login</h1>
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
        </div>
        <Button type='submit' className='w-full my-6'>Login</Button>
        <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-500'>Signup</Link></span>
      </form>
    </div>
  )
}

export default Login