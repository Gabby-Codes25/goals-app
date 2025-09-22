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
    <div>
      <form onSubmit={handleSubmit}>
        <input
         type="text"
         onChange={(e) => setNewGoal((prev) => ({...prev, title: e.target.value}))}
         className=''
        />
        <textarea
         placeholder='Description'
         onChange={(e) => setNewGoal((prev) => ({...prev, description: e.target.value}))}
         className=''
        />
        <button
         type="submit"
         className='cursor-pointer'
         >
          Add Goal
        </button>
      </form>
    </div>
  )
}

export default form