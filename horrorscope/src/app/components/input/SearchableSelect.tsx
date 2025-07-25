import React, { useState, useRef, useEffect } from "react";
export interface Option {
  value: string;
  label: string;
  metaData?: unknown;
}
interface SearchableSelectProps {
  id: string;
  label?: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  customClass?: string;
  error?: "true" | "false";
  errorMessage?: string;
  disabled?: boolean;
}
const SearchableSelect: React.FC<SearchableSelectProps> = ({
  id,
  label,
  options,
  onChange,
  required = false,
  placeholder = "Select an option",
  customClass = "",
  error,
  errorMessage,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const filteredOptions = options?.filter((option) =>
    option?.label?.toLowerCase().includes(searchTerm?.toLowerCase())
  );
  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };
  return (
    <div ref={wrapperRef} className={`w-full relative ${customClass}`}>
      {label && (
        <label htmlFor={id} className={`text-sm text-[#121212] font-opensans font-semibold`}>
          {label}
          {required && <span className="text-red-900"> *</span>}
        </label>
      )}
      <div
        data-error={error}
        className={`flex items-center bg-[#F8F8FF] justify-between w-full p-2.5 h-10 text-sm font-normal font-opensans text-[#98A2B3] mt-1 border rounded-[16px] outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-gray-300 focus:border-gray-300 !h-[56px] ${
          disabled
            ? "cursor-not-allowed"
            : "cursor-pointer"
        }`}
        onClick={() => disabled ? null : setIsOpen(!isOpen)}
      >
        <span className="text-[#121212]">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-[#111827] transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      {error === "true" && (
        <small className="text-rodo relative">{errorMessage}</small>
      )}
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          <input
            type="text"
            className="w-full p-2 border-b border-gray-200 outline-none"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="max-h-60 overflow-auto">
            {filteredOptions?.length > 0 ? (
              filteredOptions?.map((option, i) => (
                <li
                  key={`${option.value}-${i}`}
                  className="p-2 text-sm text-[#121212] hover:bg-light cursor-pointer"
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <div className="p-4">
                <p className="text-center font-light text-gray-200">
                  No options
                </p>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
export default SearchableSelect;
