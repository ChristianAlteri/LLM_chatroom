import React, { useState } from 'react';
import { BiSolidCheckSquare } from 'react-icons/bi';

interface CheckboxProps {
  reminder: string;
  completed: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ reminder, completed }) => {
  const [isChecked, setIsChecked] = useState(completed);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className='flex items-center p-1.5 justify-between cursor-pointer text-slate-900'>
      <div className='flex items-center'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='sr-only'
        />
        <div className='flex items-center h-5 w-5 hover:bg-blue-100 rounded border hover:border-slate-900'>
          {isChecked && <BiSolidCheckSquare size={'30px'} />}
        </div>
      </div>
      {reminder}
    </label>
  );
};

export default Checkbox;
