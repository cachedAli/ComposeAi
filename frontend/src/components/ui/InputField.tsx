import { useEffect, useState } from "react";
import clsx from "clsx";

import type { FormField } from "@/types/formTypes";
import { EyeClosed, EyeIcon } from "lucide-react";
import {
  Controller,
  type Control,
  type UseControllerReturn,
} from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";

const InputField = ({
  label,
  type,
  name,
  error,
  control,
  placeholder,
}: { error: string; control: Control } & FormField) => {
  return (
    <div className=" space-y-2">
      <label className="block font-medium mb-2 text-sm">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            field={field}
            name={name}
            type={type}
            error={error}
            placeholder={placeholder}
          />
        )}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default InputField;

type InputProps = {
  error: string;
  field: UseControllerReturn["field"];
  name: string;
  type: string;
  placeholder?: string;
};

const Input = ({ field, name, type, error, placeholder }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const { user } = useUserStore();
  const location = useLocation();
  const isSignin = location.pathname === "/signin";
  const isSendEmail = name === "emailFrom";

  const defaultEmail = user && isSendEmail ? user.email ?? "" : "";
  const [inputValue, setInputValue] = useState(field.value || defaultEmail);

  useEffect(() => {
    field.onChange(defaultEmail);
  }, []);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <input
        {...field}
        id={name}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          field.onChange(e);
        }}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        className={clsx(
          `border outline-none border-neutral-600 p-2 rounded-lg w-full pr-10`,
          error ? "border-red-500" : "focus:border-cyan-500",
          "placeholder:text-neutral-500"
        )}
      />
      {/* Forgot Password */}
      {isSignin && type === "text" && (
        <h2 className={clsx("text-right mt-1 -mb-4")}>
          <Link
            to="/forgot-password"
            className={clsx(
              "text-sm  text-gray-200 cursor-pointer transition-colors duration-300",
              "hover:text-cyan-400"
            )}
          >
            Forgot Password?
          </Link>
        </h2>
      )}
      {type === "password" && (
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-neutral-600"
        >
          {showPassword ? (
            <EyeClosed
              size={20}
              className="hover:text-cyan-500 cursor-pointer transition-colors duration-300"
            />
          ) : (
            <EyeIcon
              size={20}
              className="hover:text-cyan-500 cursor-pointer transition-colors duration-300"
            />
          )}
        </button>
      )}
    </div>
  );
};
