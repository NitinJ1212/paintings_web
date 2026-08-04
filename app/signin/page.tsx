import { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign In | Art Gallery Atelier",
  description: "Sign in to your Art Gallery account to explore curations and save your favorite masterpieces.",
};

export default function SignInPage() {
  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Access your curated collections, artwork ratings, and personal exhibition."
    >
      <SignInForm />
    </AuthLayout>
  );
}
