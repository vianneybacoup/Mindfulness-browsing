import React, { useContext } from 'react';
import { AppContext } from '../../../context';
import { AiOutlineAppstore } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { host, favicon } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="p-2 mb-10 bg-slate-200 flex flex-col items-center justify-center">
      <div className="flex justify-end w-full">
        <AiOutlineAppstore
          size={20}
          className="fill-slate-700 cursor-pointer"
          onClick={() => navigate('/all')}
        />
      </div>

      <div className="p-2 pb-2 text-xl mb-10">{host}</div>
      <div className="rounded-md border-2 border-white bg-slate-100 p-3 -m-10">
        <img width={32} height={32} src={favicon} />
      </div>
    </div>
  );
};

export default Header;
