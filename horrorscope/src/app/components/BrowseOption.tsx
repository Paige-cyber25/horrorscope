import { useState } from "react";
import { Icon } from "@iconify/react";
import { BrowseOptionProps } from "@/utils/utils";


export const BrowseOption: React.FC<BrowseOptionProps> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  
    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };
  
    const iconName = isOpen ? "solar:alt-arrow-up-line-duotone" : "solar:alt-arrow-down-line-duotone";
  
    return (
      <div className='mt-6 first:mt-0'>
        <div className='flex items-center gap-3 justify-between cursor-pointer' onClick={toggleOpen}>
          <span className='text-[#F8F8FF] text-[12px] sm:text-base font-opensans font-semibold'>{title}</span>
          <Icon icon={iconName} className="text-xl sm:text-2xl text-[#F8F8FF]" />
        </div>
        {isOpen && (
          <div className='mt-3'>
            {children}
          </div>
        )}
      </div>
    );
  };