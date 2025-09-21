'use client'

import React from 'react';
import Dashboard from './dashboard/page';
import Form from './components/form'


export default function Home() {
  return (
    <div>
      <Form />
      <Dashboard />
    </div>
  );
}
