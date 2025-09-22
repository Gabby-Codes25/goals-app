import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className="max-w-md">        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <SignUp 
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          forceRedirectUrl="/"
          />
        </div>
      </div>
    </div>
  )
}