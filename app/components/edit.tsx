'use client'

import React from 'react'
import { useState } from 'react'

type EditProps = {
  editGoal: {
    title: string;
    description: string;
  };
  goalId?: string;
  updateGoal: (id: string, title: string, description: string) => Promise<void>;
  onUpdate: () => void;
  onCancel: () => void;
};

const Edit = ({ editGoal, goalId, updateGoal, onUpdate, onCancel }: EditProps) => {
    const [editGoals, setEditGoals] = useState(editGoal);

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      if (goalId) {
        await updateGoal(goalId, editGoals.title, editGoals.description);
        onUpdate();
      } else {
        console.error('Goal ID is undefined.');
      }
    }


  return (
    <div>
        <div className='justify-center items-center px-8 mx-auto max-w-2xl'>
        <h1 className='font-bold text-2xl text-center justify-center py-2'>Add Goal</h1>
        <form onSubmit={handleSubmit} className='bg-gray-200 text-black grid p-4 rounded-xl mb-4 gap-4'>
          <input
          type="text"
          value={editGoals.title}
          placeholder='Enter your title'
          onChange={(e) => setEditGoals((prev) => ({...prev, title: e.target.value}))}
          className='rounded-xl border border-gray-300 p-2 mr-2'
          />
          <textarea
          value={editGoals.description}
          placeholder='Enter your description'
          onChange={(e) => setEditGoals((prev) => ({...prev, description: e.target.value}))}
          className='rounded-xl border border-gray-300 p-2 mr-2'
          />
          <button
          type="button"
          onClick={onCancel}
          className='bg-blue-200 shadow-xl block rounded-xl cursor-pointer'
          >
            Cancel
          </button>
          <button
          type="submit"
          className='bg-blue-200 shadow-xl block rounded-xl cursor-pointer'
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default Edit