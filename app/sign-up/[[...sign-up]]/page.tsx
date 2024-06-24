import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignUp redirectUrl="/new-user" afterSignUpUrl="/new-user" />
    </div>
  );
}
