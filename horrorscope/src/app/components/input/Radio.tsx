import React from 'react';

interface RadioButtonProps {
  label?: string;
  value?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: "true" | "false";
  errorMessage?: string;
  name?: string; 
}

const Radio = ({
  label,
  value,
  checked,
  onChange,
  error = "false",
  errorMessage,
  name,
}: RadioButtonProps) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={label}
        value={value}
        checked={checked}
        onChange={onChange}
        name={name} // <-- Add this line
        className="w-[20px] h-[20px] accent-[#C42424]"
      />
      <label
        htmlFor={label}
        className="ml-2 !text-base !font-normal text-midnight-black font-opensans font-normal"
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