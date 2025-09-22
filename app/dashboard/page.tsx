import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import GoalsList from '../components/goalsList'
import Form from '../components/form'

const Dashboard = async() => { 
    const user = await currentUser()

    if (!user) {
        return <div>Loading...</div>;
    }

  return (
    <div>
        <Form userId={user.id} />
        <GoalsList userId={user.id} />
    </div>
  )
}

export default Dashboard