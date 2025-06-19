"use client";

import { motion } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";
import { RiLinkM } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

interface InputFieldProps {
  variant: "text" | "email";
  value: string;
  onValueChange: (val: string) => void;
  className?: string;
}

const InputField = ({ variant, value, onValueChange, className }: InputFieldProps) => {
  const resolvePlaceholder = (): string => {
    if (variant === "email") return "john@nelsondev.com";
    if (variant === "text") return "Endpoint URL";
    return "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "10px" }}
      animate={{ opacity: 1, y: 0 }}
      className={twMerge("bg-black/5 dark:bg-white/10 p-1 rounded-lg mb-4", className)}
    >
      <div className="bg-white dark:bg-[#1f1f1f] p-1 rounded-md flex items-center justify-between">
        <div className="p-2 border-r mr-2 border-black/20 dark:border-white/20">
          {variant === "email" && <HiOutlineMail className="text-xl opacity-70" />}
          {variant === "text" && <RiLinkM className="text-xl opacity-70" />}
        </div>
        <input
          type={variant}
          placeholder={resolvePlaceholder()}
          required
          value={value}
          onChange={(e) => onValueChange(e.currentTarget.value)}
          className="block w-full outline-none rounded-md p-2 bg-[transparent]"
        />
      </div>
    </motion.div>
  );
};

export default InputField;
