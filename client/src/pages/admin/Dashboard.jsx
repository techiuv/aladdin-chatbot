import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Title from '../../components/shared/Title'
import ProgressBar from '../../components/shared/ProgressBar';

const Dashboard = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/admin/validate-password`, {
        password: data.password,
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        fetchUsers();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to validate password');
    } finally {
      setLoading(false);
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/users`);
      setUsers(response.data.users);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch users');
    }
  };

  return (
    <>
      <Title title='Admin Panel - Aladdin' />
      <ProgressBar />



      
      <main className="p-6 w-screen min-h-screen flex justify-center items-center bg-dark flex-col text-white">
        <h1 className="text-3xl font-semibold mb-4">Users Dashboard</h1>

        {!isAuthenticated ? (
          <form className='bg-dark' onSubmit={handleSubmit(handlePasswordSubmit)}>
            <p className="mb-4 text-textlight fomt-lg w-3/4 mx-auto text-center">Please enter the admin password to access the data</p>

            <input
              type="password"
              className="w-full p-4 my-2 text-sm  border border-textlight bg-transparent placeholder:text-textlight rounded-lg focus:outline-none"
              placeholder="Enter password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-sm  font-normal">{errors.password.message}</p>}

            <button
              type="submit"
              className="w-full my-2 py-3 uppercase flex justify-center items-center font-medium text-lg bg-white text-secondary rounded-lg hover:bg-neutral-200 focus:outline-none"
              disabled={loading}
            >
              {loading ? (

                <div className="w-8 h-8 animate-spin border-t-transparent border-4 border-secondary rounded-full"></div>
              ) : (
                'Submit'
              )}
            </button>

            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          </form>
        ) : (
          <div className="w-[90%] md:w-3/4">
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-4 animate-pulse">
                    <div className="w-1/3 h-6 bg-gray-300 rounded-md"></div>
                    <div className="w-1/3 h-6 bg-gray-300 rounded-md"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <p className="text-red-500 text-center">Error: {error}</p>
            ) : (
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-tertiary">
                    <th className="py-2 px-4 text-left text-sm font-medium text-white">Name</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-white">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border border-tertiary text-textlight">
                      <td className="py-2 px-4 text-sm text-textlight">{user.name}</td>
                      <td className="py-2 px-4 text-sm text-textlight">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        )}
      </main>
    </>
  );
};

export default Dashboard;
