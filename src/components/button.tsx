import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ className, ...props }) => (
  <button
    className={`w-32 rounded-md bg-white py-2 disabled:bg-gray-500 
      ${className}`}
    {...props}
  />
);
