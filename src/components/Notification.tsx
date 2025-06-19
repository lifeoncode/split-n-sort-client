import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface NotificationProps {
  message: string;
  onClose: (value: null) => void;
  timeout: number;
}

const Notification = ({ message, onClose, timeout }: NotificationProps) => {
  useEffect(() => {
    setTimeout(() => onClose(null), timeout);
  }, [onClose, timeout]);

  return (
    <div className="flex items-center justify-center w-full fixed top-0 pt-5">
      <div className="text-sm p-4 rounded-lg border-t border-black/10 md:max-w-[300px] shadow-2xl relative">
        <IoCloseOutline className="absolute top-1 right-2 cursor-pointer text-xl" onClick={() => onClose(null)} />
        <p className="mt-3">{message}</p>
        <div className="mt-3 bg-black/20 w-[50%] mx-auto">
          <div className="bg-black h-[2px] rounded-full notification-bar" />
        </div>
      </div>
    </div>
  );
};

export default Notification;
