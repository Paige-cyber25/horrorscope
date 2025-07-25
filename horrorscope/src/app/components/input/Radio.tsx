
interface RadioButtonProps {
    label?: string;
    value?: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: "true" | "false";
    errorMessage?: string;
  }
  
  const Radio = ({ label, value, checked, onChange, error = "false",
  errorMessage, }: RadioButtonProps) => {
    return (
      <div className="flex items-center">
        <input
          type="radio"
          id={label}
          value={value}
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 accent-[#C42424]"
        />
        <label
          htmlFor={label}
          className="ml-2 !text-sm !font-normal text-[#121212] font-opensans font-semibold"
        >
          {label}
        </label>
        {error === "true" && (
          <small className="text-[#D6280E] relative -top-2">{errorMessage}</small>
        )}
      </div>
    );
  };
  
  export default Radio;
  