import React from 'react';
import { auth } from '@clerk/nextjs/server'
import Dashboard from './dashboard/page';
import { SignUp } from '@clerk/nextjs';


const Home = async () => {
  const { isAuthenticated } = await auth()

  if (!isAuthenticated) {
    console.log('user not found')
    return (
    <div className='w-full text-3xl text-center justify-center font-bold mt-40'>Please sign in to view your dashboard...</div>
  )
  }

  return (
    <div>
      {isAuthenticated ? (
        <>
          <Dashboard />
        </>
      ) : (
        <SignUp />
      )}
    </div>
  );
}

export default Home;
