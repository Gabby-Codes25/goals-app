
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className="max-w-md">                
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <SignIn 
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            forceRedirectUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  )
}