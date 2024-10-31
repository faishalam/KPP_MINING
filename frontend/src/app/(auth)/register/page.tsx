import FormRegisterSection from "@/app/components/pages/AuthComponents/FormRegisterSection";
import HeaderForm from "@/app/components/pages/AuthComponents/HeaderForm";
import { RegisterProvider } from "@/app/providers/authProviders/RegisterProviders";

export const metadata = {
    title: 'KPP | Register Page',
};

export default function RegisterPage() {
    return (
        <>
            <RegisterProvider>
                <HeaderForm
                    title="Please Register Your Account"
                    description="We need your details to create your account"
                />
                <FormRegisterSection />
            </RegisterProvider>
        </>
    )
}