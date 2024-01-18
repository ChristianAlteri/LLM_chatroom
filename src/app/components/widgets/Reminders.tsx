import React from "react";
import { PiPersonSimpleThrowDuotone } from "react-icons/pi";
import Checkbox from "../inputs/CheckBox";

interface RemindersProps {
  admin: boolean; 
}

const Reminders: React.FC<RemindersProps> = ({
  admin
}) => {
  return (
    <div className="border rounded-md border-slate-600 overflow-y-auto h-3/3">
      <div className="px-4 py-16 max-w-md mx-auto">
        <div className="space-y-2 flex w-full items-center justify-center">
          <div className="flex items-center overflow-y-auto">
            <div className="text-sm w-full h-full">
              {/* Map over this and pass reminder and completed from DB */}
            <Checkbox reminder="reminder" completed={true}/>
            <Checkbox reminder="reminder" completed={false}/>
            <Checkbox reminder="reminder" completed={true}/>
            <Checkbox reminder="reminder" completed={true}/>
              {admin && (
              <form
                className="flex flex-row gap-1 bottom-0 w-full"
                onSubmit={() => {}}
              >
                <input
                    className="rounded-md p-2 bg-slate-100 cursor-pointer transition hover:text-black hover:bg-blue-100 hover:border hover:border-slate-900"
                  type="text"
                  placeholder="Set a reminder"
                  value={undefined}
                  onChange={() => {}}
                />
                <button
                  type="submit"
                  className="
                        rounded-md
                        p-2
                        bg-slate-100
                        cursor-pointer
                        transition
                        hover:text-black
                        hover:bg-blue-200
                        hover:border
                        hover:border-slate-500
                         "
                        >
                    <PiPersonSimpleThrowDuotone
                        size={15}
                        className="text-slate-500 hover:text-black"
                  />
                </button>
              </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
