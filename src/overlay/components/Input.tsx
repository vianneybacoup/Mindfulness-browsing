import React from 'react';

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props,
) => {
  return (
    <input
      {...props}
      className="p-2 font-bold text-sky-600 outline-0 text-xs font-thin border-2 border-slate-300 rounded-md text-slate-500"
    />
  );
};

export default Input;
