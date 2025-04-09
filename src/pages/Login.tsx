import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import { useAuth } from '../context/AuthContext';

interface LoginProps {
  username: string;
  email: string;
  password: string;
}

const initialLoginValue: LoginProps = {
  username: '',
  email: '',
  password: ''
};

const Login = () => {
  const [loginData, setLoginData] = useState<LoginProps>(initialLoginValue);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      login(data.login.jwt, {
        id: data.login.user.id,
        name: data.login.user.username,
        email: data.login.user.email,
      });
      alert("You're successfully logged in!");
      navigate('/home');
    },
    onError: (error) => {
      console.error("Login error:", error);
      setMessage(error.message || "Login failed. Please check your credentials.");
    }
  });

  const handleClick = () => navigate('/signup');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  }

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await loginUser({
        variables: {
          input: {
            identifier: loginData.username,
            password: loginData.password
          }
        }
      });
      navigate('/home');
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Please provide valid credentials");
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#f5f7fa] p-6">
      
      {/* Orb background effects */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 rounded-full filter blur-3xl opacity-50 animate-pulse" />
      <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-gradient-to-br from-yellow-200 via-pink-300 to-red-400 rounded-full filter blur-2xl opacity-40" />
      
      <div className="relative w-full max-w-md p-8 rounded-xl backdrop-blur-md bg-white/40 border border-white/30 shadow-xl z-10">
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5 text-gray-800">
          <h2 className="text-3xl font-bold text-center">Login</h2>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              autoComplete="username"
              placeholder="Enter username"
              className="h-10 border mt-1 rounded px-4 bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={loginData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Enter email"
              className="h-10 border mt-1 rounded px-4 bg-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={loginData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter password"
              className="h-10 border mt-1 rounded px-4 bg-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={loginData.password}
              onChange={handleInputChange}
            />
          </div>

          {message && <p className="text-red-500 text-sm italic">{message}</p>}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-sm text-center">
            Don't have an account?{' '}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={handleClick}
            >
              Sign Up
            </span>
          </p>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          ©2025 WanderLust. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
