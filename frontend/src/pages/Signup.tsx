import { useNavigate } from "react-router-dom";

import { signupFields } from "@/libs/constants/authConstants";
import { signupSchema } from "@/libs/schema/authSchema";
import AuthButtons from "@/components/ui/AuthButtons";
import { useAuthStore } from "@/store/useAuthStore";
import type { SignupData } from "@/types/authTypes";
import Form from "@/components/ui/Form";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, signupLoading } = useAuthStore();

  const handleSubmit = async (data: SignupData) => {
    try {
      const success = await signup(data);
      if (success) {
        navigate("/verify-email");
      } else if (!success) {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An unexpected error occurred.");
    }
  };
  return (
    <>
      <Form
        fields={signupFields}
        schema={signupSchema}
        onSubmit={handleSubmit}
        buttonLabel="Signup"
        loading={signupLoading}
      />

      <AuthButtons />
    </>
  );
};

export default Signup;
