"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CgCloseR } from "react-icons/cg";
import Calendar from "../Calendar";


interface CalendarModalProps {
  label: string;
  id: string;
  children?: React.ReactNode;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  label,
  id,
  children,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


  const closeModal = () => {
    setModalOpen(false);
    // onClose();
  };
  
  const openModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);



  return (
    <>
    <div  
        className="
        hover:underline
        hover:cursor-pointer
        " 
        onClick={openModal}>Calendar
    </div>
    
    <div className="modal-overlay">
      <div className="modal-content">
        <Transition.Root show={modalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-800"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-800"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  fixed
                  inset-0
                  bg-blue-100
                  bg-opacity-70
                  transition-opacity
                "
              ></div>
            </Transition.Child>

            <div className="fixed border inset-5 overflow-y-auto flex items-center justify-center">
              <div
                className="
                inset-5
                  flex 
                  flex-col
                  items-center 
                  justify-center 
                  p-3
                  text-center
                  rounded-md
                  border
                  border-slate-900
                  bg-white
                  h-full
                  w-full

                "
              >
                {/* Components container */}
                <div className="w-full h-full">
                  {/*  Buttons */}
                  <div className="flex flex-row w-full gap-4 items-center p-1 justify-between text-slate-900">
                    <h1 className="font-bold ">Calendar</h1>
                    <div>Filter by attendee</div>
                    <div>Log your calendar in</div>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="
                        items-end
                      rounded-md 
                      bg-slate-50 
                      text-slate-400 
                      hover:text-black
                    "
                    >
                      <span className="sr-only">Close</span>
                      <CgCloseR className="bg-blue-50 h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  </div>
                  <Calendar />
                  {/* Bottom buttons */}
                    <div className="flex mt-40 flex-row w-full gap-5 justify-end">
                        <div 
                        className="
                        flex
                        p-2
                        border
                        rounded-md
                        border-slate-900
                        ">Submit</div>
                    </div>
                  </div>
                  </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
    </>
  );
};

export default CalendarModal;
