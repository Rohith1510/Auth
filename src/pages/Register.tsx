import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../graphql/mutations';

interface SignupProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialSignupValue: SignupProps = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Signup = () => {
  const [signupData, setSignupData] = useState<SignupProps>(initialSignupValue);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const [signupUser, { loading }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signup.token);
      localStorage.setItem('user', JSON.stringify(data.signup.user));
      navigate('/');
    },
    onError: (error) => {
      console.error("Signup error:", error);
      // setMessage(error.message || "Signup failed. Please try again.");
    }
  });

  const handleClick = () => {
    navigate('/login');
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  }

  const handleSignupSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    
    try {
      await signupUser({
        variables: {
          input: {
            username: signupData.username,
            email: signupData.email,
            password: signupData.password
          }
        }
      });
    } catch (err) {
      console.error("Signup error:", err);
      setMessage("Signup failed. Please try again.");
    }
  }

  return (
    <div className='container max-w-screen-2xl w-full p-6'>
      <div className='min-w-[400px] border p-4 rounded-md shadow-md flex flex-col justify-center items-center'>
        <form onSubmit={handleSignupSubmit} className='flex flex-col gap-4 items-start w-full'>
          <h2 className='text-2xl text-text font-semibold'>Create Account</h2>
          <div className="md:col-span-5 flex flex-col items-start w-full">
            <label className='text-sm font-medium'>Name</label>
            <input
              type="text" id="username" name="username" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 appearance-none focus:shadow focus:outline-none"
              placeholder="Enter Your Name"
              value={signupData.username}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
          <div className="md:col-span-5 flex flex-col items-start w-full">
            <label className='text-sm font-medium'>Email</label>
            <input
              type="email" id="email" name="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 appearance-none focus:shadow focus:outline-none"
              placeholder="Enter Email Address"
              value={signupData.email}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
          <div className="md:col-span-5 flex flex-col items-start w-full">
            <label className='text-sm font-medium'>Password</label>
            <input
              type="password" name="password" id="password" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 appearance-none focus:shadow focus:outline-none"
              placeholder="Enter Password"
              value={signupData.password}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
          <div className="md:col-span-5 flex flex-col items-start w-full">
            <label className='text-sm font-medium'>Confirm Password</label>
            <input
              type="password" name="confirmPassword" id="confirmPassword" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 appearance-none focus:shadow focus:outline-none"
              placeholder="Confirm Password"
              value={signupData.confirmPassword}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
          {/* {message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>} */}
          <button 
            type="submit" 
            className='bg-button text-white px-5 py-2 rounded-[8px] flex flex-row gap-1 md:gap-3 text-sm focus:outline-none'
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
          <h3 className='text-xs text-text font-medium py-3'> Already have an account? Please <span className='text-blue-500 cursor-pointer' onClick={handleClick}>Login</span></h3>
        </form>
        <div className='flex flex-col gap-2 w-full'>
          <h3 className='text-xs text-text font-normal py-2'> ©2025 All rights reserved</h3>
        </div>
      </div>
    </div>
  )
}

export default Signup;