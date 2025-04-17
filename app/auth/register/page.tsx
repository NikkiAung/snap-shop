import React from "react";
import AuthForm from "@/components/auth/auth-form";

const RegisterPage = () => {
  return (
    <AuthForm
      formTitle="Register to your account"
      footerLabel="Already have an account"
      footerHref="/auth/login"
      showProvider={true}
    >
      <div>Register form</div>
    </AuthForm>
  );
};

export default RegisterPage;
