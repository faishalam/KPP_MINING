import FormRegisterSection from "@/components/pages/AuthComponents/FormRegisterSection";
import HeaderForm from "@/components/pages/AuthComponents/HeaderForm";

export const metadata = {
  title: "KPP | Register Page",
};

export default function RegisterPage() {
  return (
    <>
      <HeaderForm
        title="Please Register Your Account"
        description="We need your details to create your account"
      />
      <FormRegisterSection />
    </>
  );
}
