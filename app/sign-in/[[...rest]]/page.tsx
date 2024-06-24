import { SignIn } from "@clerk/nextjs";

export default function SigninPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
}
