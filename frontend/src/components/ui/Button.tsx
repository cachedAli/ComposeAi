import { cn } from "@/libs/utils";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
};

const Button = ({
  children,
  type = "button",
  onClick,
  className,
  variant = "primary",
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "w-full rounded-lg font-medium transition-colors focus:outline-none";

  const variants = {
    primary:
      "relative overflow-hidden h-12 px-8 bg-[#3d3a4e] text-white cursor-pointer group",
    secondary:
      "h-12 group px-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white cursor-pointer transition-transform duration-200 hover:scale-105",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variants[variant],
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      {...props}
    >
      {/* Primary*/}
      {variant === "primary" && (
        <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[475ms] rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 z-0" />
      )}

      {/* Button text */}
      <span
        className={cn(
          "relative z-10 transition-colors font-semibold flex items-center justify-center w-full h-full gap-2"
        )}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
