'use client'

import HeaderForm from "@/app/components/pages/AuthComponents/HeaderForm";
import FormLoginSection from "@/app/components/pages/AuthComponents/FormLoginSection";
import { LoginProvider } from "@/app/providers/authProviders/LoginProviders";

export default function LoginPage() {
    return (
        <>
            <LoginProvider>
                <HeaderForm
                    title="Welcome back, Login!"
                    description="Login to your account to continue"
                />
                <FormLoginSection />
            </LoginProvider>
        </>
    )
}