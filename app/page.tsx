import React from 'react';
import Link from 'next/link'
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
