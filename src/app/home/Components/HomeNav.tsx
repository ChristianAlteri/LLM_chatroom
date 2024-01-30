'use client'

import { PiPersonSimpleThrowDuotone } from "react-icons/pi";

const HomeNav = () => {
    return ( 
        <>
            {/* Search bar */}
            <input
            id={"1"}
            placeholder={"Search entire app"}
            onChange={() => {}}
            className="
            form-input

            w-1/3
            rounded-md 
            border-0 
            py-1.5
            text-slate-900 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-slate-300 
            placeholder:text-slate-400 
            focus:ring-2 
            focus:ring-inset 
            focus:ring-blue-300 
            sm:text-sm 
            sm:leading-6
        "
        />
        <button
        type="submit"
        className="
            rounded-md
            p-1
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
                size={25}
                className="text-slate-500 hover:text-black"
            />
        </button>
        <div>AI Search</div>
      </>
     );
}
 

export default HomeNav;