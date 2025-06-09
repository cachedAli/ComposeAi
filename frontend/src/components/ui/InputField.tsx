// InputField.jsx (or .tsx if you’re using TypeScript)
import type { FormField } from "@/types/formTypes";
import { Controller, type Control } from "react-hook-form";

const InputField = ({
  label,
  type,
  name,
  error,
  control,
}: { error: string; control: Control } & FormField) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-medium mb-1">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            className={`border p-2 rounded w-full ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
        )}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
