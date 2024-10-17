import FormRegisterSection from "@/app/components/pages/AuthComponents/FormRegisterSection";
import HeaderForm from "@/app/components/pages/AuthComponents/HeaderForm";

export default function RegisterPage() {
    return (
        <>
            <HeaderForm
                title="Please Register Your Account"
                description="We need your details to create your account"
            />

            <FormRegisterSection />
        </>
    )
}