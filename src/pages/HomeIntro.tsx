
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_USER_DBS } from '../graphql/mutations'; 

const HomeIntro = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_USER_DBS);

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[#f5f7fa] text-gray-900">
      {/* Gradients */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 rounded-full filter blur-3xl opacity-50 animate-pulse" />
      <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-gradient-to-br from-yellow-200 via-pink-300 to-red-400 rounded-full filter blur-2xl opacity-40" />

      {/* Navbar */}
      <nav className="z-10 w-full flex justify-between items-center px-6 py-4 bg-white/30 backdrop-blur-md shadow-sm">
        <div className="text-2xl font-bold">🌍 WanderLust</div>
        <ul className="hidden md:flex space-x-6 text-lg">
          <li className="hover:text-blue-600 cursor-pointer transition">Home</li>
          <li className="hover:text-blue-600 cursor-pointer transition">Destinations</li>
          <li className="hover:text-blue-600 cursor-pointer transition">Blog</li>
          <li className="hover:text-blue-600 cursor-pointer transition">Contact</li>
        </ul>
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <div className="z-10 flex-grow flex flex-col items-center justify-center px-4 py-12 w-full">
        <div className="max-w-6xl w-full bg-white/30 backdrop-blur-lg p-10 rounded-3xl border border-white/20 shadow-2xl text-center hover:shadow-blue-200 transition duration-300">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
            Explore the World with Us
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700">
            Discover breathtaking destinations, curated travel experiences, and unforgettable memories.
          </p>
          <button
            onClick={handleClick}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Start Your Journey
          </button>

          {/* 🆕 UserDbs Table */}
          <div className="mt-10 overflow-x-auto">
            {loading && <p>Loading users...</p>}
            {error && <p className="text-red-600">Error: {error.message}</p>}
            {!loading && data?.userDbs?.length > 0 && (
              <table className="min-w-full mt-6 bg-white/60 text-left border-collapse rounded-lg overflow-hidden shadow-md">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">DOB</th>
                    <th className="p-3">Active</th>
                  </tr>
                </thead>
                <tbody>
                  {data.userDbs.map((user: any) => (
                    <tr key={user.documentId} className="border-t">
                      <td className="p-3">{user.Name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.phone}</td>
                      <td className="p-3">{user.DOB}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-white text-xs ${
                            user.is_active ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {!loading && data?.userDbs?.length === 0 && <p>No users found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeIntro;

