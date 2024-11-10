// 'use client'

import HeaderForm from "@/components/pages/AuthComponents/HeaderForm";
import FormLoginSection from "@/components/pages/AuthComponents/FormLoginSection";

export default function LoginPage() {
  return (
    <>
        <HeaderForm
          title="Welcome back, Login!"
          description="Login to your account to continue"
        />
        <FormLoginSection />
    </>
  );
}
