import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignUp } from '../../hooks/useSignUp';
import { Spinner } from '../../assets/Loading';
import SEO from '../../utility/SEO';

const SignUp = () => {
  const [user, setUser] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const {loading, signup} = useSignUp();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(user);
  }
  return (
    <section>
      {/* metadata */}
      <SEO title="Sign Up" description="Vivekanand Education Society's Institute of Technology, Chembur" name="Vivekanand Education Society's Institute of Technology, Chembur" type="website" />

      <div className='h-screen flex flex-col gap-2 justify-center items-center mx-auto w-[85%] md:w-[25%]'>
          <h1 className=' font-bold text-3xl mb-5'>Sign Up</h1>
          <div className='flex flex-col gap-3 rounded-md w-full'>
            <input onChange={handleChange} className='p-2 rounded-md border-2' name='userName' type="text" placeholder='Enter Username' />
            <input onChange={handleChange} className='p-2 rounded-md border-2' name='fullName' type="text" placeholder='Enter Full Name' />
            <input onChange={handleChange} className='p-2 rounded-md border-2' name='email' type="email" placeholder='Enter VES Email ID' />
            <input onChange={handleChange} className='p-2 rounded-md border-2' name='password' type="password" placeholder='Enter Password' />
            <input onChange={handleChange} className='p-2 rounded-md border-2' name='confirmPassword' type="password" placeholder='Confirm Password' />
            <div>
              <button disabled={loading} onClick={handleSubmit} className='p-2 rounded-md bg-gray-700 text-white w-full hover:opacity-90 disabled:opacity-75'>
                {loading?
                  <Spinner />
                : "Sign Up"}
              </button>
              <Link to="/signin">Already have an account?</Link>
            </div>
          </div>
    </div>
    </section>
  )
}

export default SignUp