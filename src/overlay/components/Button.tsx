import React from 'react';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props,
) => {
  return <button {...props} className="p-2 font-bold text-sky-600" />;
};

export default Button;
