'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { auth } from '@clerk/nextjs/server'
import { createSupabaseClient } from '@/libs/supabase-client'

interface Goal {
    id: string;
    title: string;
    description: string;
}

const Dashboard = () => {
    const supabase = createSupabaseClient()
    const [ goals, setGoals ] = useState<Goal[]>([])

    const fetchGoals = async () => {
        const { userId } = await auth();

        if (!userId) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { data, error} = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", userId);
        
        if (error) {
            console.error('Error fetching goals:', error.message);
            return;
        }

        setGoals(data)
    }

    useEffect(() => {
        fetchGoals()
    }, [])

    console.log(goals);

  return (
    <div>
        <h1>Dashboard</h1>
        {goals.map((goal, key) => (
                <div key={key}>
                    <h2>{goal.title}</h2>
                    <p>{goal.description}</p>
                </div>
            ))}
    </div>
  )
}

export default Dashboard