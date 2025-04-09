import { useNavigate } from "react-router-dom";

const HomeIntro = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login')
  }

  return (
    <div className='container max-w-screen-2xl w-full p-6 '>
       Welcome to the Home page Screen
       <h3 className='text-xl text-text font-medium py-3'> Haven't an account? Please <span className='text-blue-500 cursor-pointer' onClick={handleClick}>Login</span></h3>
    </div>
  )
}

export default HomeIntro