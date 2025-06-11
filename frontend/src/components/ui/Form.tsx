import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { ZodSchema } from "zod";

import type { FormField } from "@/types/formTypes";
import InputField from "./InputField";
import Button from "./Button";

type FormProps = {
  fields: FormField[];
  schema: ZodSchema;
  onSubmit: (data: any) => void | Promise<any>;
  buttonLabel?: string;
  backButtonLabel?: string;
  backButtonOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} & Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "disabled" | "className"
>;
const Form = ({
  schema,
  fields,
  onSubmit,
  buttonLabel = "Submit",
  backButtonLabel,
  backButtonOnClick,
  ...buttonProps
}: FormProps) => {
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
    const shouldReset = await onSubmit({
      ...data,
    });
    if (shouldReset) {
      reset();
    }
  };
  return (
    <form
      className={clsx(
        "w-full grid grid-cols-2 gap-4 items-center justify-center"
      )}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {fields.map((field, index) => (
        <div
          key={index}
          className={clsx(
            "flex flex-col",
            field.colspan === 1 ? "col-span-1" : "col-span-2",
            field.smColspan && "max-sm:col-span-2"
          )}
        >
          <InputField
            control={control}
            error={errors[field.name]?.message as string}
            label={field.label}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
          />
        </div>
      ))}
      <Buttons
        buttonLabel={buttonLabel}
        backButtonLabel={backButtonLabel}
        buttonProps={buttonProps}
        backButtonOnClick={backButtonOnClick}
      />
    </form>
  );
};

export default Form;

type ButtonsProps = {
  buttonProps?: Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "disabled" | "className"
  >;
  backButtonOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonLabel: string;
  backButtonLabel?: string;
};

const Buttons = ({
  buttonProps,
  buttonLabel,
  backButtonLabel,
  backButtonOnClick,
}: ButtonsProps) => {
  return (
    <div className="flex flex-col gap-3 col-span-2">
      <Button
        type="submit"
        {...buttonProps}
        variant="secondary"
        className="col-span-2"
      >
        {buttonLabel}
      </Button>

      {backButtonLabel && (
        <Button
          type="button"
          onClick={backButtonOnClick}
          variant="primary"
          className="col-span-2"
        >
          {backButtonLabel}
        </Button>
      )}
    </div>
  );
};
