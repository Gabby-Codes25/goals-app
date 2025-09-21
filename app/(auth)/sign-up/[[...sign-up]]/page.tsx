//app/(auth)/sign-up/[[...sign-up]]/page.jsx
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 flex items-center justify-center p-4'>
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