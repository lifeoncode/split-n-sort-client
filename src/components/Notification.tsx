"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

interface NotificationProps {
  variant: "error" | "success";
  message: string;
  onClose: (value: null) => void;
  timeout: number;
}

const Notification = ({ variant, message, onClose, timeout }: NotificationProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => onClose(null), timeout);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [onClose, timeout]);

  const handleManualClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onClose(null);
  };

  return (
    <div className="flex items-center justify-center w-full fixed top-0">
      <motion.div
        initial={{ top: 0, opacity: 0 }}
        animate={{ top: "40px", opacity: 1 }}
        className={twMerge(
          "text-sm p-4 rounded-lg border border-black/10 bg-black/2 dark:border-white/10 dark:bg-white/5 md:max-w-[300px] relative",
          variant === "error" &&
            "border-[orangered]/30 bg-[orangered]/3 dark:border-[orangered]/40 dark:bg-[orangered]/5"
        )}
      >
        <IoCloseOutline className="absolute top-1 right-2 cursor-pointer text-xl" onClick={handleManualClose} />
        <p className="mt-3">{message}</p>
        <div className="mt-3 bg-black/20 dark:bg-white/20 w-[50%] mx-auto">
          <div className="bg-black dark:bg-white h-[2px] rounded-full notification-bar" />
        </div>
      </motion.div>
    </div>
  );
};

export default Notification;
