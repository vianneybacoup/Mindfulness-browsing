import React from 'react';
import { RiLoader4Line } from 'react-icons/ri';

const LoadingView: React.FC = () => {
  return (
    <div className="w-full h-full bg-slate-100 flex justify-center items-center">
      <RiLoader4Line size={60} className="animate-spin fill-emerald-500" />
    </div>
  );
};

export default LoadingView;
