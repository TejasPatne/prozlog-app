import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignIn } from '../../hooks/useSignIn.jsx';
import { Spinner } from '../../assets/Loading.jsx';
import SEO from '../../utility/SEO.jsx';

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const {loading, signin} = useSignIn();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    signin(user);
  }
  return (
    <section>
      {/* metadata */}
      <SEO title="Sign In" description="Vivekanand Education Society's Institute of Technology, Chembur" name="Vivekanand Education Society's Institute of Technology, Chembur" type="website" />

      <div className='h-screen flex flex-col gap-2 justify-center items-center mx-auto w-[85%] md:w-[25%]'>
          <h1 className=' font-bold text-3xl mb-5'>Sign In</h1>
          <div className='flex flex-col gap-3 rounded-md w-full'>
            <input onChange={handleChange} className='p-2 rounded-md border-2' name='email' type="email" placeholder='Enter Email' />
            <input onChange={handleChange} className='p-2 rounded-md border-2' name='password' type="password" placeholder='Enter Password' />
            <div>
              <button disabled={loading} onClick={handleSubmit} className='p-2 rounded-md bg-gray-700 text-white w-full hover:opacity-90 disabled:opacity-75'>
                {loading?
                  <Spinner />
                : "Sign In"}
              </button>
              <Link to="/signup">Don&rsquo;t have an account?</Link>
            </div>
          </div>
    </div>
    </section>
  )
}

export default SignIn