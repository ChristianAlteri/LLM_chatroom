import { EventDetails } from "@prisma/client";
import axios from "axios";
import { is } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { BiSolidCheckSquare } from "react-icons/bi";

interface CheckboxProps {
  reminder: string;
  note: string;
  completed: boolean;
  name: string;
  eventDetails: EventDetails;
}

const Checkbox: React.FC<CheckboxProps> = ({ 
    reminder, 
    completed, 
    note,
    name,
    eventDetails,
}) => {
  const [isChecked, setIsChecked] = useState(completed);

  useEffect(() => {
    console.log('completed prop:', completed);
    console.log('isChecked state:', isChecked);

    setIsChecked(completed);
  }, [completed]);

  const handleCheckboxChange = async () => {
    try {
      if (completed === false) {
        setIsChecked(true);
      } else { 
        setIsChecked(false);
      }
      console.log("isChecked", isChecked);
      //   await axios.post('/api/update-completed-state', {
      //     completed: !isChecked,
      //   });
    } catch (error) {
      console.error('Error updating completed state:', error);
    }
  };



  return (
    <>
      <div className="border-slate-100 w-full border-b-2 hover:border hover:border-slate-900 rounded-md hover:bg-blue-50">
        <label className="flex flex-col p-1 cursor-pointer gap-1 text-slate-900">
          <div className="flex flex-row justify-between p-0.5  ">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="sr-only"
            />
            {/* Box/name */}
            <div>
              <div className="flex items-center h-5 w-5 hover:bg-blue-100 rounded border hover:border-slate-900">
                {isChecked && <BiSolidCheckSquare size={"30px"} />}
              </div>
              <p className="flex mt-1 flex-col text-xs text-slate-300">{name}</p>
            </div>
            {/* Note */}
            <div className="flex flex-col left-0 justify-end">
          <div className="text-slate-900 font-bold">
            {reminder}
          </div>
            <div className="text-slate-400 text-xs -m-0.5 p-1">
               {note}
            </div>
            </div>
          </div>
        </label>
      </div>
    </>
  );
};

export default Checkbox;
