import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      className="bg-purple-1 text-white w-full py-2 rounded hover:bg-purple-2 font-semibold transition-all duration-300 "
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
