'use client'

import HeaderForm from "@/app/components/pages/AuthComponents/HeaderForm";
import FormLoginSection from "@/app/components/pages/AuthComponents/FormLoginSection";

export default function LoginPage() {
    return (
        <>
            <HeaderForm
                title="Welcome back, Login!"
                description="Login to your account to continue"
            />
            <FormLoginSection />
        </>
    )
}