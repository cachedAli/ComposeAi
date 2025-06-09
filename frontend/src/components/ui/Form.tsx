import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import type { ZodSchema } from "zod";
import type { FormField } from "@/types/formTypes";

type FormProps = {
  fields: FormField[];
  schema: ZodSchema;
  onSubmit: (data: any) => void | Promise<any>;
};
const Form = ({ schema, fields, onSubmit }: FormProps) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (data: any) => {
    await onSubmit(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {fields.map((field, index) => (
        <div key={index}>
          <InputField
            control={control}
            error={errors[field.name]?.message as string}
            label={field.label}
            name={field.name}
            type={field.type}
          />
        </div>
      ))}
    </form>
  );
};

export default Form;
