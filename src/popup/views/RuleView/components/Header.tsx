import { AppContext } from '@popup/context';
import React, { useContext } from 'react';
import { AiOutlineAppstore } from 'react-icons/ai';
import { FiArrowLeft } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { host, favicon, rules } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="p-2 mb-10 bg-slate-200 flex flex-col items-center justify-center">
      {location.state ? (
        <div className="flex justify-start w-full">
          <FiArrowLeft
            onClick={() => navigate(-1)}
            size={20}
            className="cursor-pointer"
          />
        </div>
      ) : (
        <div className="flex justify-end w-full">
          <AiOutlineAppstore
            size={20}
            className="fill-slate-700 cursor-pointer"
            onClick={() => navigate('/all')}
          />
        </div>
      )}

      <div className="p-2 pb-2 text-xl mb-10">
        {location.state ? location.state.rule : host}
      </div>
      <div className="rounded-md border-2 border-white bg-slate-100 p-3 -m-10">
        <img
          width={32}
          height={32}
          src={location.state ? rules[location.state.rule].favicon : favicon}
        />
      </div>
    </div>
  );
};

export default Header;
