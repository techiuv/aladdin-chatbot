import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Title from '../../components/shared/Title';
import ProgressBar from '../../components/shared/ProgressBar';



const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  const handleSignUp = async (data) => {
    setLoading(true);
    setError(''); 

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      navigate('/')

    } catch (err) {
      if (err.response) {
        // If there are validation errors
        if (err.response.status === 400) {
          const validationErrors = err.response.data.errors;
          if (validationErrors) {
            // Map the validation errors to the form fields
            for (const field in validationErrors) {
              setError(field, {
                type: 'server',
                message: validationErrors[field],
              });
            }
          } else {

            setError('Account already exits.');
          }
        } else {
          setError('Something went wrong.');
        }
      } else {
        setError('Something went wrong.');
      }
    } finally {
      setLoading(false); 
    }
  };






  return (
    <>
      <Title title='Sign Up - Aladdin' />
      <ProgressBar />

      <div className=" bg-secondary flex justify-center items-center flex-col h-screen w-screen ">
        <h2 className="text-[3rem] capitalize font-bold text-white text-center mb-4">Create Account</h2>


        <form onSubmit={handleSubmit(handleSignUp)} className="w-[40%] mx-auto p-5 rounded-lg">
          {/* Name Input */}
          <div className="mb-4">

            <input
              type="text"
              id="name"
              placeholder='Your Name '
              autoComplete='off'
              {...register('name', { required: 'Name is required' })}
              className={`w-full p-4 text-sm  mt-2 border border-textlight bg-transparent placeholder:text-textlight rounded-lg focus:outline-none  ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-sm my-2 font-normal">{errors.name.message}</p>}
          </div>

          {/* Email Input */}
          <div className="mb-4">

            <input
              type="email"
              id="email"
              placeholder='Your Email '
              autoComplete='off'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: 'Please enter a valid email address',
                },
              })}
              className={`w-full p-4 text-sm  mt-2 border border-textlight bg-transparent placeholder:text-textlight rounded-lg focus:outline-none' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm my-2 font-normal">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-4">

            <input
              type="password"
              id="password"
              placeholder="Your Password"
              autoComplete="off"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password should ateast 8 characters'
                }
              })}
              className={`w-full p-4 text-sm mt-2 border border-textlight bg-transparent placeholder:text-textlight rounded-lg focus:outline-none`}
            />

            {errors.password && <p className="text-red-500 text-sm my-2 font-normal">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          {loading ? (
            <div className="flex justify-center">
              <div className="w-full flex justify-center items-center py-3 uppercase font-medium text-lg bg-white cursor-not-allowed opacity-65 text-secondary rounded-lg focus:outline-none">
                <div className='w-8 h-8 animate-spin  border-t-transparent border-4 border-secondary rounded-full '></div>
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3 uppercase flex justify-center items-center font-medium text-lg bg-white text-secondary rounded-lg hover:bg-neutral-200 focus:outline-none"
              disabled={loading}
            >
              Sign Up
            </button>
          )}

        </form>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div>
          <p className='text-lg text-textlight'>Already have a account? <Link to={'/auth/login'} className='text-white underline'>Login</Link></p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
