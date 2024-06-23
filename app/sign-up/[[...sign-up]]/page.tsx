import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <SignUp
      redirectUrl="/new-user"
      afterSignUpUrl="/new-user"
    />
  )
}