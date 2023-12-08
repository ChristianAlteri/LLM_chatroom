import getUsers from "@/app/actions/getUsers";
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SearchModal from "../modals/SearchModal";

interface SearchBarProps {
  label: string;
  id: string;
  children?: React.ReactNode;
  items: any[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  label,
  id,
  children,
  items,
}) => {
  //   console.log("users", items);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const allItems = items.filter((item) => item.email.toLowerCase());

  const setModalOpen = () => {
    setIsModalOpen(true);
  };

  const resetModalState = () => {
    setIsModalOpen(false);
  };

  return (
    <form>
      <div>
        <label
          className="
              block 
              text-sm 
              font-medium 
              leading-6 
              text-slate-900
            "
        ></label>
        <div className="mt-2">
          <input
            id={id}
            onClick={() => setModalOpen()}
            placeholder={label}
            value={searchQuery}
            onChange={handleSearchChange}
            className="
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
                sm:leading-6"
          />
        </div>
      </div>
      <div>{isModalOpen && <SearchModal id={id} label={label} items={allItems} onClose={resetModalState}/>}</div>
    </form>
  );
};

export default SearchBar;
