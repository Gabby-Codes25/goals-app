'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/libs/supabase-client'


interface Goal {
    id: string;
    title: string;
    description: string;
}

const GoalsList = ({ userId }: { userId: string }) => {
    const supabase = createSupabaseClient()
    
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchGoals = async () => {
        setLoading(true);
        try {
            console.log('Fetching goals for userId:', userId);
            const { data, error } = await supabase
                .from("goals")
                .select("*")
                .eq('user_id', userId);

            if (error) {
                console.error('Error fetching goals:', error.message);
                setGoals([]);
            } else {
                setGoals(data || []);
            }
        } catch (error) {
            console.error('Error fetching goals:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, [userId]);

    console.log(goals);

  return (
    <div>
        <h1>Dashboard</h1>
        {goals.map((goal) => (
                <div key={goal.id}>
                    <h2>{goal.title}</h2>
                    <p>{goal.description}</p>
                </div>
            ))}
    </div>
  )
}

export default GoalsList