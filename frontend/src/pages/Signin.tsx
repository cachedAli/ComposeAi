import { useNavigate } from "react-router-dom";

import { signinFields } from "@/libs/constants/authConstants";
import { signinSchema } from "@/libs/schema/authSchema";
import AuthButtons from "@/components/ui/AuthButtons";
import { useAuthStore } from "@/store/useAuthStore";
import type { SigninData } from "@/types/authTypes";
import Form from "@/components/ui/Form";

const Signin = () => {
  const { signin } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (data: SigninData) => {
    const success = await signin(data);

    if (success) {
      navigate("/email-assistant");
    }
    return;
  };

  return (
    <>
      <Form
        fields={signinFields}
        schema={signinSchema}
        onSubmit={handleSubmit}
        buttonLabel="Signin"
      />

      <AuthButtons />
    </>
  );
};

export default Signin;
