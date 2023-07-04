import { AppContext } from '@popup/context';
import React, { useContext } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AllRulesView: React.FC = () => {
  const { rules } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="p-2 bg-slate-200">
        <div className="flex items-center">
          <FiArrowLeft
            onClick={() => navigate(-1)}
            size={20}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="overflow-auto h-80 pt-2">
        {Object.keys(rules).map((rule, index) => (
          <div
            key={`rule-${index}`}
            className="flex rounded-md bg-slate-100 p-3 m-2 items-center cursor-pointer"
            onClick={() => {
              navigate('/rule', { state: { rule } });
            }}
          >
            <img width={32} height={32} src={rules[rule].favicon} />
            <div className="text-md ml-4 flex-1 truncate">{rule}</div>
            <div>
              <AiOutlineRight size={15} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllRulesView;
