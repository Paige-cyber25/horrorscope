import type { ChangeEvent } from "react";
interface TextAreaProps {
  id: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  error?: "true" | "false";
  errorMessage?: string;
  searchInput?: boolean;
  value: string;
  name: string;
  single?: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  customClass?: string; // Must be a tailwind class
}
const TextArea = ({
  id,
  label,
  disabled,
  placeholder = "",
  required = false,
  error = "false",
  errorMessage,
  value,
  onChange,
  customClass,
  ...rest
}: TextAreaProps) => {
  return (
    <div className={`w-full relative mb-2`}>
      {label && (
        <label
          htmlFor={id}
          className={`text-sm text-[#121212] font-opensans font-semibold`}
        >
          {label}
          {required && <span className="text-red-900"> *</span>}
        </label>
      )}
      <textarea
        id={id}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        data-error={error}
        value={value}
        onChange={onChange}
        rows={3}
        cols={3}
        {...rest}
        className={`w-full p-[10px] font-light text-sm mt-1 bg-[#F8F8FF] border rounded-[16px] outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-gray-300 focus:border-gray-300 ${
          customClass ?? ""
        }`}
      />
      {error === "true" && (
        <small className="text-red-900 relative">{errorMessage}</small>
      )}
    </div>
  );
};
export default TextArea;
