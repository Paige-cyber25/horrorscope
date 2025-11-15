
import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Icon } from "@iconify/react";

export interface SelectOption { 
  value: string;
  label: string;
  metaData?: unknown;
}

interface SearchableSelectProps {
  id: string;
  label?: string;
  options: SelectOption[];
  // 🎯 Update onChange to handle both single (string) and multi (SelectOption[]) selection
  onChange: (value: string | SelectOption[]) => void; 
  placeholder?: string;
  required?: boolean;
  customClass?: string;
  error?: "true" | "false";
  errorMessage?: string;
  disabled?: boolean;
  // 🎯 Update value to handle both single (SelectOption) and multi (SelectOption[])
  value?: SelectOption | SelectOption[] | null; 
  loadingIndicator?: ReactNode; 
  isMulti?: boolean; // 🎯 New prop to enable multi-select mode
}

// Helper component to display selected multiple items
const SelectedBadge: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => (
    <span className="inline-flex items-center text-xs font-medium bg-[#E2E8F0] text-[#121212] rounded-full px-2 py-0.5 mr-1 mb-1">
        {label}
        <Icon icon="ic:round-close" className="ml-1 cursor-pointer" onClick={onRemove} width={12} />
    </span>
);

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
  value,
  loadingIndicator,
  isMulti = false, // 🎯 Default to single-select
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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

  const isOptionSelected = (option: SelectOption) => {
    if (!isMulti || !Array.isArray(value)) return false;
    return value.some(v => v.value === option.value);
  };
  
  const handleSelect = (option: SelectOption) => {
    if (isMulti) {
        const selectedValues = Array.isArray(value) ? value : [];
        if (isOptionSelected(option)) {
            // Remove option
            const newSelection = selectedValues.filter(v => v.value !== option.value);
            onChange(newSelection);
        } else {
            // Add option
            const newSelection = [...selectedValues, option];
            onChange(newSelection);
        }
        setSearchTerm("");
        // Keep dropdown open for multi-select
    } else {
        // Single select mode (existing logic)
        onChange(option.value); 
        setIsOpen(false);
        setSearchTerm("");
    }
  };

  const handleRemove = (option: SelectOption) => {
    if (isMulti && Array.isArray(value)) {
        const newSelection = value.filter(v => v.value !== option.value);
        onChange(newSelection);
    }
  };
  
  const displayContent = () => {
    if (disabled && loadingIndicator) {
        return loadingIndicator; 
    }
    
    if (isMulti) {
        const selectedArray = Array.isArray(value) ? value : [];
        if (selectedArray.length === 0) {
            return placeholder;
        }
        return (
            <div className="flex flex-wrap items-center">
                {selectedArray.map(opt => (
                    <SelectedBadge 
                        key={opt.value} 
                        label={opt.label} 
                        onRemove={() => handleRemove(opt)} 
                    />
                ))}
            </div>
        );
    }
    
    // Single Select Mode
    const singleValue = value as SelectOption | null | undefined;
    return singleValue ? singleValue.label : placeholder;
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
        // 🎯 Added flex-start alignment for multi-select badges
        className={`flex items-start bg-[#F8F8FF] justify-between w-full p-2.5 min-h-[56px] text-sm font-normal font-opensans text-[#98A2B3] mt-1 border rounded-[16px] outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-gray-300 focus:border-gray-300 ${
          disabled
            ? "cursor-not-allowed"
            : "cursor-pointer"
        }`}
        onClick={() => disabled ? null : setIsOpen(!isOpen)}
      >
        <div className="py-2 flex-grow">
          {displayContent()} 
        </div>
        <svg
          className={`w-5 h-5 text-[#111827] transform transition-transform duration-200 mt-2 ${
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
        <small className="text-red-500 relative">{errorMessage}</small>
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
                  className={`p-2 text-sm text-[#121212] hover:bg-light cursor-pointer flex items-center justify-between ${isMulti && isOptionSelected(option) ? 'bg-[#E2E8F0]' : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                  {isMulti && isOptionSelected(option) && (
                      <Icon icon="material-symbols:check-circle" className="text-green-600" width={18} />
                  )}
                </li>
              ))
            ) : (
              <div className="p-4">
                <p className="text-center font-medium text-[#121212]">
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