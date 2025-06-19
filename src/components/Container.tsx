import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return <div className={twMerge("w-[95%] lg:w-[90%] xl:w-[1200px] mx-auto", className)}>{children}</div>;
};

export default Container;
