'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/libs/supabase-client'
import Edit from './edit'


interface Goal {
    id: string;
    title: string;
    description: string;
}

const GoalsList = ({ userId }: { userId: string }) => {
    const supabase = createSupabaseClient()
    
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [editingGoals, setEditingGoals] = useState<{title: string; description: string; id?: string} | null>(null);

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

    const updateGoal = async (id: string, title: string, description: string) => {
        const { error } = await supabase
            .from('goals')
            .update({ 
                title: title, 
                description: description
            })
            .eq('id', id);
        if (error) {
            console.error('Error updating goal:', error.message);
        }
        await fetchGoals();
    };

    const deleteGoal = async (id: string) => {
        const { error } = await supabase
            .from('goals')
            .delete()
            .eq('id', id);
        if (error) {
            console.error('Error deleting goal:', error.message);
        }
        fetchGoals();
    };

    useEffect(() => {
        fetchGoals();

        const channel = supabase
            .channel('goals-changes')
            .on('postgres_changes', 
                { 
                    event: 'INSERT', 
                    schema: 'public', 
                    table: 'goals',
                    filter: `user_id=eq.${userId}`
                }, (payload) => {
                console.log('Change received!', payload);
                setGoals((prevGoals) => [...prevGoals, payload.new as Goal]);
            })
            .on('postgres_changes', 
                { 
                    event: 'UPDATE', 
                    schema: 'public', 
                    table: 'goals',
                    filter: `user_id=eq.${userId}`
                }, (payload) => {
                console.log('Change received!', payload);
                setGoals((prevGoals) => prevGoals.map(goal => goal.id === payload.new.id ? (payload.new as Goal) : goal));
            })
            .on('postgres_changes', 
                { 
                    event: 'DELETE', 
                    schema: 'public', 
                    table: 'goals',
                    filter: `user_id=eq.${userId}`
                }, (payload) => {
                console.log('Change received!', payload);
                setGoals((prevGoals) => prevGoals.filter(goal => goal.id !== payload.old.id));
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId]);

    console.log(goals);

  return (
    <div>
        <div className='w-full justify-center items-center px-8 mx-auto max-w-2xl'>
            <h1 className='text-2xl font-bold justify-center text-center'>Goals</h1>
            {editingGoals ? (
                <Edit
                 editGoal={
                    {
                        title: editingGoals.title, 
                        description: editingGoals.description
                    }
                 } 
                 goalId={editingGoals.id}
                 updateGoal={updateGoal}
                 onCancel={() => setEditingGoals(null)} 
                 onUpdate={() => {
                    setEditingGoals(null);
                    fetchGoals();
                    }}
                />
            ) : loading ?(
                <div className='flex justify-center items-center py-8'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
                    <span className='ml-2 text-gray-600'>Loading...</span>
                </div>
            ) : (
                goals.map((goal) => (
                <div key={goal.id}
                className='bg-gray-200 text-black py-4 px-8 rounded-xl m-8'
                >
                    <h2 className='font-bold text-2xl'>{goal.title}</h2>
                    <p>{goal.description}</p>
                    <div className='flex justify-between px-2 py-2'>
                        <button 
                        onClick={() => 
                            setEditingGoals({
                                id: goal.id,
                                title: goal.title, 
                                description: goal.description 
                            })}
                        className='bg-green-400 shadow-xl rounded-xl px-6 py-2 mt-2 ml-2 cursor-pointer'>Edit</button>
                        <button
                        onClick={() => deleteGoal(goal.id)}
                         className='bg-red-400 shadow-xl rounded-xl px-6 py-2 mt-2 cursor-pointer'>Delete</button>
                    </div>
                </div>
            ))
            )}
        </div>
    </div>
  )
}

export default GoalsList