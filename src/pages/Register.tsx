
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  confirmPassword: '',
};

const Signup = () => {
  const [signupData, setSignupData] = useState<SignupProps>(initialSignupValue);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const [signupUser, { loading }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signup.token);
      localStorage.setItem('user', JSON.stringify(data.signup.user));
      alert("Account created successfully!");
      navigate('/');
    },
    onError: (error) => {
      console.error("Signup error:", error);
      setMessage("Signup failed. Please try again.");
    },
  });

  const handleClick = () => navigate('/login');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

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
            password: signupData.password,
          },
        },
      });
    } catch (err) {
      console.error("Signup error:", err);
      setMessage("Signup failed. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#e0e0e0] to-[#f9f9f9] flex items-center justify-center overflow-hidden">
      
      {/* Floating Orb */}
      <div className="absolute w-[600px] h-[600px] bg-white rounded-full blur-[100px] opacity-30 top-[-200px] left-[-150px]" />
      <div className="absolute w-[400px] h-[400px] bg-[#d1eaff] rounded-full blur-[90px] opacity-40 bottom-[-100px] right-[-100px]" />

      <div className="relative z-10 w-full max-w-md p-8 bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl">
        <form onSubmit={handleSignupSubmit} className="flex flex-col gap-6 text-gray-900">
          <h2 className="text-4xl font-semibold text-center mb-2 tracking-tight">Create your Account</h2>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Name</label>
            <input
              type="text"
              name="username"
              value={signupData.username}
              onChange={handleInputChange}
              required
              placeholder="John Appleseed"
              className="rounded-lg px-4 py-2 bg-white/50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleInputChange}
              required
              placeholder="john@example.com"
              className="rounded-lg px-4 py-2 bg-white/50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleInputChange}
              required
              placeholder="••••••••"
              className="rounded-lg px-4 py-2 bg-white/50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={handleInputChange}
              required
              placeholder="••••••••"
              className="rounded-lg px-4 py-2 bg-white/50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          {message && (
            <div className="text-red-600 text-sm font-medium text-center">{message}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition duration-200"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className="text-center text-sm">
            Already have an account?{' '}
            <span
              onClick={handleClick}
              className="text-black font-medium cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </form>

        <div className="mt-8 text-center text-xs text-gray-400">
          ©2025 AppleVibes. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Signup;
