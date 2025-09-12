import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 flex items-center justify-center p-4'>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-gray-600">Create your account to start documenting your goals.</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <SignUp 
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
                      forceRedirectUrl="/onboarding"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 w-full",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "border-2 border-gray-200 hover:border-orange-300",
                formButtonPrimary: "bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700",
                footerActionLink: "text-orange-600 hover:text-orange-700"
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}