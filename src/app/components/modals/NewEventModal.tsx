'use client'

import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";

import { CgCloseR } from "react-icons/cg"

import { useRouter } from "next/navigation";

import { Conversation, User } from "@prisma/client";


interface NewEventModalProps {
    onClose?: () => void;
    conversation: Conversation & {
        users: User[];
      };
}

const NewEventModal: React.FC<NewEventModalProps> = ({
    onClose,
    conversation,
}) => {

    const router = useRouter();

   const handleYesNewEventDetails = (e: React.FormEvent) => {
         e.preventDefault();

         // Make a post request to the event details and blank it all to start new event
        router.push(`/conversations/${conversation.id}`)
   }

    return ( 
        <Transition.Root show={true}>
        <Dialog
            as='div'
            className='relative z-50 '
            onClose={() => onClose && onClose()} 
        >
            <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave='ease-in duration-200'
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div 
                    className="
                        fixed
                        inset-0
                        bg-slate-500 
                        bg-opacity-75
                        transition-opacity
                    "
                />
            </Transition.Child>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                    className="
                    flex 
                    min-h-full
                    items-center
                    p-4
                    justify-center
                    text-center
                    sm:p-0
                    "
                >
                    <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave='ease-in duration-200'
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel
                        className="
                        relative
                        transform
                        overflow-hidden
                        rounded-lg
                        bg-slate-50
                        px-4
                        pb-4
                        text-left
                        shadow-xl
                        transition-all
                        w-full  
                        sm:my-8
                        sm:w-full
                        sm:max-w-lg
                        sm:p-6
                        "
                        >
                            <div
                            className="
                            absolute 
                            right-0
                            top-0
                            hidden
                            pr-4
                            pt-4
                            sm:block
                            z-10
                            "
                            >
                                <button
                        type="button"
                        className="
                        rounded-md 
                        bg-slate-50 
                        text-slate-400 
                        hover:text-black
                        "
                        onClick={() => onClose && onClose()} 
                    >
                        <span className="sr-only">Close</span>
                        <CgCloseR className="h-6 w-6" aria-hidden="true" />
                    </button>
                            </div>
                            u sure?
                            <form onSubmit={handleYesNewEventDetails}>
                                <button className="hover:underline">yes</button>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
        
    </Transition.Root>
    );
}
 
export default NewEventModal;