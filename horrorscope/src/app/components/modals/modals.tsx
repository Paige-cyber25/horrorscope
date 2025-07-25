
import ReactDOM from "react-dom";
import { useEffect } from "react";

interface ModalProps {
  isShown: boolean;
  children: React.ReactNode;
}

const Modal = ({ isShown, children }: ModalProps) => {
  useEffect(() => {
    if (isShown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isShown]);

  const modal = (
    <div className="fixed inset-0 w-full h-full z-[500] animate-fadeIn">
      {children}
    </div>
  );

  return isShown
    ? ReactDOM.createPortal(modal, document.getElementById("modal") as HTMLElement)
    : null;
};

export default Modal;