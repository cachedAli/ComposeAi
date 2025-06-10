import { signinFields } from "@/libs/constants/authConstants";
import { signinSchema } from "@/libs/schema/authSchema";
import AuthButtons from "@/components/ui/AuthButtons";
import Form from "@/components/ui/Form";

type Data = {
  email: string;
  password: string;
};

const Signin = () => {
  const handleSubmit = (data: Data) => {
    console.log(data);
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
