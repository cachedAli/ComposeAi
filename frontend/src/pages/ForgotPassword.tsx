import EmailSent from "@/components/layouts/auth/EmailSent";
import Form from "@/components/ui/Form";
import { forgotPasswordFields } from "@/libs/constants/authConstants";
import { forgotPasswordSchema } from "@/libs/schema/authSchema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Data = {
  email: string;
};

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (data: Data) => {
    console.log(data);
    setEmailSent(true);
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
