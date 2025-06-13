import clsx from "clsx";
import { motion } from "framer-motion";
import Form from "../Form";
import type { FormField } from "@/types/formTypes";
import type { ZodSchema } from "zod";
import Button from "../Button";

type BaseProps = {
  title: string;
  description: string;
  backButtonOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type SendEmailModalProps = BaseProps & {
  confirmText: "SendEmail";
  fields: FormField[];
  schema: ZodSchema;
  onSubmit: (data: any) => void | Promise<any>;
};

type LogoutModalProps = BaseProps & {
  confirmText: "Logout";
  onClick: () => Promise<void>;
};

type ConfirmationModalProps = SendEmailModalProps | LogoutModalProps;

const ConfirmationModal = ({ ...props }: ConfirmationModalProps) => {
  const isSendEmail = props.confirmText === "SendEmail";
  return (
    <div className=" bg-black/50 backdrop-blur-sm fixed z-50 inset-0 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{
          opacity: 0,
          scale: 0.9,
          transition: { duration: 0.15, ease: "easeIn" },
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={clsx(
          " z-50 w-[500px] max-sm:w-[300px] px-6 py-6 max-sm:px-4 max-sm:py-4 gap-6 shadow-xl rounded-xl border border-neutral-600 flex flex-col items-start",
          "bg-neutral-800"
        )}
      >
        <div className="flex flex-col gap-2 items-start justify-center max-sm:items-center max-sm:text-center">
          <h2 className="text-2xl max-sm:text-xl font-semibold">
            {props.title}
          </h2>
          <p className="text-lg max-sm:text-sm">{props.description}</p>
        </div>

        {isSendEmail ? (
          <Form
            fields={props.fields}
            schema={props.schema}
            onSubmit={props.onSubmit}
            backButtonOnClick={props.backButtonOnClick}
            backButtonLabel="Cancel"
            buttonsClassName=" flex-row-reverse mt-2"
            buttonLabel="Send Email"
          />
        ) : (
          <div className="flex gap-3 mt-2 w-full">
            <Button onClick={props.backButtonOnClick}>Cancel</Button>
            <Button variant="secondary" onClick={props.onClick}>
              Logout
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ConfirmationModal;
