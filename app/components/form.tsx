'use client'

import React from 'react'
import { useState } from 'react'
import { createSupabaseClient } from '@/libs/supabase-client'

const form = ({ userId }: { userId: string}) => {
  const supabase = createSupabaseClient()
  const [ newGoal, setNewGoal ] = useState({title: '', description: ''})

  // handle submit function
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const {error } = await supabase
      .from("goals")
      .insert({
        title: newGoal.title,
        description: newGoal.description,
        user_id: userId,
      })
      .select();

      if (error) {
        console.error("Error adding goals", error.message)
        return;
      }

      setNewGoal({title: '', description: ''});
  }

  return (
    <div className='w-full py-5'>
      <div className='justify-center items-center px-8 mx-auto max-w-2xl'>
        <h1 className='font-bold text-2xl text-center justify-center py-2'>Add Goal</h1>
        <form onSubmit={handleSubmit} className='bg-gray-200 text-black grid p-4 rounded-xl mb-4 gap-4'>
          <input
          type="text"
          value={newGoal.title}
          placeholder='Enter your title'
          onChange={(e) => setNewGoal((prev) => ({...prev, title: e.target.value}))}
          className='rounded-xl border border-gray-300 p-2 mr-2'
          />
          <textarea
          value={newGoal.description}
          placeholder='Enter your description'
          onChange={(e) => setNewGoal((prev) => ({...prev, description: e.target.value}))}
          className='rounded-xl border border-gray-300 p-2 mr-2'
          />
          <button
          type="submit"
          className='bg-blue-200 block rounded-xl cursor-pointer'
          >
            Add Goal
          </button>
        </form>
      </div>
    </div>
  )
}

export default form