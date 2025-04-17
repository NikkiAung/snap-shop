import React from "react";
import AuthForm from "@/components/auth/auth-form";
const LoginPage = () => {
  return (
    <AuthForm
      formTitle="Login to your account"
      footerLabel="Don't have an account"
      footerHref="/auth/register"
      showProvider
    >
      <div>Login form</div>
    </AuthForm>
  );
};

export default LoginPage;
