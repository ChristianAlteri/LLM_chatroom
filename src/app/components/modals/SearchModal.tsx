"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CgCloseR } from "react-icons/cg";
import Input from "../inputs/Input";

interface SearchModalProps {
  items: any[];
  onClose: () => void;
  label: string;
  id: string;
  children?: React.ReactNode;
}

const SearchModal: React.FC<SearchModalProps> = ({
  items,
  onClose,
  label,
  id,
  children,
}) => {
  const [modalOpen, setModalOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
//   const searchRef = useRef<HTMLInputElement>(null);


  const handleSearch = () => {
    setSearchQuery(inputRef.current?.value || "");
    console.log("Search Query:", inputRef.current?.value);
  }

  const filteredUsers = items.filter((item) => 
  item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };
  

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  console.log("Filtered Users:", filteredUsers);

  return (
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

            <div className="fixed inset-5 overflow-y-auto flex items-center justify-center">
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
                  h-full
                  w-full

                "
              >
                {/* Components container */}
                <div className="w-full h-full">
                  {/*  Buttons */}
                  <div className="flex flex-row w-full gap-4 items-center p-1 justify-between text-slate-900">
                    search modal
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

                  {/* Search bar */}
                  <input
                    ref={inputRef}
                    id={id}
                    placeholder={label}
                    onChange={handleSearch}
                    className="
                    mt-7
                    form-input
                    block 
                    w-full
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
                <div>
                {searchQuery && (
                <div className="bg-white rounded-md">
                    {filteredUsers.map((item) => (
                    <div className="p-1.5 mt-5 h-full top-0" key={item.id}>
                        <div className="flex flex-row w-full justify-center text-slate-900">
                        <ul className="flex flex-row justify-between  w-full mt-2 ">
                            <li className=" relative flex cursor-pointer hover:underline hover:text-slate-900">
                            <p className="font-semibold">{item.name}</p> - 
                            <p className=""> {item.email}</p> 
                            </li>
                            <p className="flex justify-end">Add</p>
                        </ul>
                        </div>
                    </div>
                    ))}
                    </div>
                )}
                <div className="flex mt-40 flex-row w-full gap-5">
                  <div className="flex">item</div>
                  <div className="flex">item</div>
                  <div className="flex">item</div>
                </div>
                </div>
                {/* Search options */}
              </div>
            </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
};

export default SearchModal;
