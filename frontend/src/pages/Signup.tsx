import { signupFields } from "@/libs/constants/authConstants";
import { signupSchema } from "@/libs/schema/authSchema";
import AuthButtons from "@/components/ui/AuthButtons";
import Form from "@/components/ui/Form";

type Data = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const Signup = () => {
  const handleSubmit = (data: Data) => {
    console.log(data);
  };
  return (
    <>
      <Form
        fields={signupFields}
        schema={signupSchema}
        onSubmit={handleSubmit}
        buttonLabel="Signup"
      />

      <AuthButtons />
    </>
  );
};

export default Signup;
