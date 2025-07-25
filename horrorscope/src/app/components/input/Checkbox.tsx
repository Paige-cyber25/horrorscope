import { ChangeEvent } from "react";
import clsx from "clsx";

interface CheckboxProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  label?: string;
  shape?: "circle" | "rounded";
}

const Checkbox = ({
  id = "checkbox",
  name,
  value,
  onChange,
  checked,
  label,
  shape = "circle",
}: CheckboxProps) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={`checkbox-${id}`}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={clsx(
          "peer relative appearance-none w-4 h-4 border border-primaryP focus:outline-none checked:bg-[#F7F7F7] checked:border-primaryP",
          {
            "rounded-full": shape === "circle",
            null: shape === "rounded",
          },
          "after:content-[''] after:w-full after:h-full after:absolute after:left-0 after:top-0 after:bg-no-repeat after:bg-center after:bg-[length:8px] checked:after:bg-[url('/images/dark-blue-check.svg')]"
        )}
      />
      {label && (
        <label
          htmlFor={`checkbox-${id}`}
          className="ml-2 !text-sm !font-medium text-[#121212] font-opensans font-semibold cursor-pointer"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
