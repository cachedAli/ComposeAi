import EmailSent from "@/components/layouts/auth/EmailSent";
import Form from "@/components/ui/Form";
import { forgotPasswordFields } from "@/libs/constants/authConstants";
import { forgotPasswordSchema } from "@/libs/schema/authSchema";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Data = {
  email: string;
};

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const { forgotPassword } = useAuthStore();

  const handleSubmit = async (data: Data) => {
    const success = await forgotPassword(data);

    if (success) {
      setEmailSent(true);
    }
    return;
  };

  const navigate = useNavigate();
  return (
    <div>
      {!emailSent ? (
        <Form
          fields={forgotPasswordFields}
          schema={forgotPasswordSchema}
          onSubmit={handleSubmit}
          buttonLabel="Send verification code"
          backButtonLabel="Back to Login"
          backButtonOnClick={() => navigate("/signin")}
        />
      ) : (
        <EmailSent />
      )}
    </div>
  );
};

export default ForgotPassword;
