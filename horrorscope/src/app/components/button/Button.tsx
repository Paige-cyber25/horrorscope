import { ReactNode } from "react";
import Spinner from "../spinner/Spinner";

interface ButtonProps {
  label: string | ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  type?: "button" | "submit";
  loading?: boolean;
  size?: "small" | "medium" | "large";
  customClass?: string; // Must be a tailwind class
  leftAccessory?: ReactNode;
  rightAccessory?: ReactNode;
}
const Button = ({
  label,
  onClick,
  disabled,
  type = "button",
  loading,
  size = "large",
  rightAccessory,
  leftAccessory,
  customClass,
}: ButtonProps) => {

  const sizes = {
    small: "w-1/5",
    medium: "w-1/2",
    large: "w-full",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      className={`relative text-sm font-medium disabled:cursor-not-allowed flex gap-1 items-center justify-center cursor-pointer ${
        sizes[size]
      } mt-4 ${customClass ?? ""}`}
    >
      {leftAccessory}
      {loading ? <Spinner size="medium" /> : label}
      {rightAccessory}
    </button>
  );
};
export default Button;
