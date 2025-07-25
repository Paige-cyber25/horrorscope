import { ChangeEvent, ReactNode, KeyboardEvent } from "react";
export interface InputProps {
  id: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  error?: "true" | "false";
  errorMessage?: string;
  value: string;
  name: string;
  single?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  leftAccessory?: ReactNode;
  rightAccessory?: ReactNode;
  customClass?: string;  // Must be a tailwind class
  containerClass?: string; // New prop for container styling
  inputBg?: string;
  inputBorder?: string;
  max?: string | number;
  min?:string | number;
}

const Input = ({
  id,
  label,
  type = "text",
  required = false,
  error = "false",
  errorMessage,
  value,
  single = true,
  leftAccessory,
  customClass,
  containerClass,
  rightAccessory,
  inputBg,
  inputBorder,
  max,
  min,
  ...rest
}: InputProps) => {
  return (
    <div className={`flex flex-col w-full ${containerClass || ""}`}>
      <div className={`w-full relative ${single ? "mb-2" : ""}`}>
        {label && (
          <label htmlFor={id} className={`text-sm text-[#121212] font-opensans font-semibold`}>
            {label}
            {required && <span className="text-[#D6280E]"> *</span>}
          </label>
        )}
        {leftAccessory}
        <input
          id={id}
          type={type}
          required={required}
          data-error={error}
          value={value}
          max={max}
          min={min}
          {...rest}
          autoComplete="off"
          className={`w-full h-10 text-sm font-light mt-[6px] ${inputBg ?? 'bg-transparent'} border ${inputBorder ?? 'border-formBorder'} rounded outline-none transition disabled:opacity-50 disabled:cursor-not-allowed ${customClass ?? ""} ${
            leftAccessory ? "ps-11" : "pl-4"
          } ${type === "color" ? "pr-48" : ""}`}
        />
        {rightAccessory}
      </div>
      {error === "true" && (
        <small className="text-[#D6280E] relative -top-1">{errorMessage}</small>
      )}
    </div>
  );
};
export default Input;