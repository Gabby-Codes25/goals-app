//app/(auth)/sign-in/[[...sign-in]]/page.jsx
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 flex items-center justify-center'>
      <div className="max-w-md">                
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <SignIn 
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            forceRedirectUrl="/"
          />
        </div>
      </div>
    </div>
  )
}