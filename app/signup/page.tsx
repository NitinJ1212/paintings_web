import { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Create Account | Art Gallery Atelier",
  description: "Join the Art Gallery Atelier to start your personalized fine art journey.",
};

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join an exclusive community of art lovers, collectors, and connoisseurs."
    >
      <SignUpForm />
    </AuthLayout>
  );
}
