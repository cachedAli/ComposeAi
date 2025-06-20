import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { ZodSchema } from "zod";

import type { FormField } from "@/types/formTypes";
import InputField from "./InputField";
import { cn } from "@/libs/utils";
import Button from "./Button";
import Loader from "./Loader";

type FormProps = {
  fields: FormField[];
  schema: ZodSchema;
  onSubmit: (data: any) => void | Promise<any>;
  buttonLabel?: string;
  backButtonLabel?: string;
  buttonsClassName?: string;
  loading?: boolean;
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
  buttonsClassName,
  loading,
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
        buttonsClassName={buttonsClassName}
        loading={loading}
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
  buttonsClassName?: string;
  loading?: boolean;
};

const Buttons = ({
  buttonProps,
  buttonLabel,
  backButtonLabel,
  backButtonOnClick,
  buttonsClassName,
  loading,
}: ButtonsProps) => {
  return (
    <div
      className={cn("flex flex-col w-full gap-3 col-span-2", buttonsClassName)}
    >
      <Button
        type="submit"
        {...buttonProps}
        variant="secondary"
        className="col-span-2"
        disabled={loading}
      >
        {loading ? <Loader /> : buttonLabel}
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
