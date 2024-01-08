'use client'

import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import ConfirmModal from "@/app/components/ConfirmModal";
import Modal from "@/app/components/modals/Modal";
// import useActiveList from "@/app/hooks/useActiveList";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";
import { CgCloseR } from "react-icons/cg"
import { PiTrashDuotone } from "react-icons/pi";
import { TbTrashX } from "react-icons/tb";

interface ProfileDrawerProps {
    isOpen: boolean;
    onClose: () => void;    
    data: Conversation & {
        users: User[];
    };
}


const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
    isOpen,
    onClose,
    data,
}) => {
    const otherUser = useOtherUser(data);
    const [confirmOpen, setConfirmOpen] = useState(false)
    // const { members } = useActiveList();
    // const isActive = members.indexOf(otherUser?.email!) !== -1;

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP')
    }, [otherUser.createdAt])

    const title = useMemo(() => {
        return data.name || otherUser.name;
    }, [data.name, otherUser.name])

    const statusText = useMemo(() => {
        if (data.isGroup) {
            return `${data.users.length} members`
        }

        // return isActive ? 'Active' : 'Offline'
        return 'Active' 
    }, [data])

    return ( 
        <>
            <ConfirmModal
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)} 
            />
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className='relative z-10' onClose={onClose}>
                    <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-400'
                    enterFrom='opacity-0'
                    enterTo="opacity-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                        <div
                        className="
                        fixed
                        inset-0
                        bg-black
                        bg-opacity-50
                        "
                        />
                    </Transition.Child>
                    <div
                    
                    className="
                    fixed 
                    inset-0 
                    overflow-hidden
                    ">
                        <div
                        className="
                        absolute
                        inset-0
                        overflow-hidden
                        "
                        >
                            <div
                            className="
                            pointer-events-none
                            fixed
                            inset-y-0
                            right-0
                            flex
                            max-w-full
                            pl-10
                            "
                            >
                                <Transition.Child
                                as={Fragment}
                                enter='transform transition ease-in-out duration-500 '
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500"
                                leaveTo='translate-x-full'
                                >
                                    <Dialog.Panel
                                    className='
                                    pointer-events-auto
                                    w-screen
                                    max-w-md
                                    '
                                    >
                                        <div
                                        className="
                                        flex
                                        h-full
                                        flex-col
                                        overflow-y-auto
                                        bg-white
                                        py-6
                                        shadow-xl
                                        "
                                        >
                                            <div className="px-4 sm:px-6">
                                                <div
                                                className="
                                                flex 
                                                items-start
                                                justify-end
                                                ">
                                                <div
                                                className="
                                                ml-3
                                                flex
                                                h-7
                                                items-center
                                                "
                                                >
                                                    <button
                                                    onClick={onClose}
                                                    type="button"
                                                    className="
                                                    bg-white
                                                    text-slate-500
                                                    hover:text-black
                                                    "
                                                    >
                                                        <span className="sr-only">Close Panel</span>
                                                        <CgCloseR size={24} />
                                                    </button>
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="
                                            relative mt-6
                                            flex-1 px-4
                                            sm:px-6
                                            ">
                                                <div
                                                className="
                                                flex flex-col items-center
                                                "
                                                >
                                                    <div
                                                    className="
                                                    mb-2
                                                    "
                                                    >
                                                        {data.isGroup ? 
                                                        (<AvatarGroup users={data.users}/>) : 
                                                        (<Avatar user={otherUser}/>)}
                                                    </div>
                                                    <div className="" >{title}</div>
                                                    <div className="mb-8 text-xs text-slate-300">{statusText}</div>
                                                    <div 
                                                    onClick={() => setConfirmOpen(true)}
                                                    className="
                                                    flex
                                                    flex-col
                                                    gap-3
                                                    items-center    
                                                    cursor-pointer
                                                    hover:opacity-80
                                                    "
                                                    >
                                                        <div
                                                        
                                                        className="
                                                        w-10
                                                        h-10
                                                        rounded-md
                                                        bg-blue-50
                                                        flex
                                                        items-center
                                                        justify-center
                                                        "
                                                        >
                                                            
                                                        <PiTrashDuotone size={23}/>
                                                        </div>
                                                        <div
                                                        className="
                                                        text-xs
                                                        mb-6
                                                        font-light
                                                        text-slate-300
                                                        hover:text-slate-900
                                                        hover:underline
                                                        ">
                                                            Delete conversation 
                                                        </div>
                                                        <div>Add click if going functionality by referencing eventDetails property called going which is an array of user id</div>
                                                    </div>
                                                </div>
                                                <div
                                                className="
                                                w-full
                                                pb-5
                                                pt-5
                                                sm:px-0
                                                sm:pt-0
                                                "
                                                >
                                                    <dl
                                                    className="
                                                    space-y-8
                                                    px-4
                                                    sm:px-6
                                                    sm:space-y-6
                                                    "
                                                    >
                                                        {data.isGroup && (
                                                            <div>
                                                                <dt
                                                                className="
                                                                text-xs
                                                                font-medium
                                                                text-slate-500
                                                                sm:w-40
                                                                sm:flex-shrink-0
                                                                "
                                                                >
                                                                    Emails
                                                                </dt>
                                                                <dd
                                                                className="
                                                                mt-1
                                                                text-xs
                                                                text-slate-900
                                                                sm:col-span-2
                                                                "
                                                                >
                                                                    {data.users.map((user) => user.email).join(', ')}
                                                                </dd>
                                                            </div>
                                                        )}
                                                        {!data.isGroup && (
                                                            <div>
                                                                <dt
                                                                className="
                                                                text-xs
                                                                font-medium
                                                                text-slate-500
                                                                sm:w-40
                                                                sm:flex-shrink-0
                                                                ">
                                                                    Email:
                                                                </dt>
                                                                <dd
                                                                className="
                                                                mt-1
                                                                text-xs
                                                                text-slate-900
                                                                sm:col-span-2

                                                                "
                                                                >
                                                                    {otherUser.email}
                                                                </dd>
                                                            </div>
                                                        )}
                                                        {!data.isGroup && (
                                                            <>
                                                            <hr />
                                                            <div>
                                                                <dt
                                                                className="
                                                                text-xs
                                                                font-medium
                                                                text-slate-500
                                                                sm:w-40
                                                                sm:flex-shrink-0
                                                                ">
                                                                    Joined
                                                                </dt>
                                                                <dd
                                                                className="
                                                                mt-1
                                                                text-xs
                                                                text-slate-900
                                                                sm:col-span-2
                                                                ">
                                                                    <time dateTime={joinedDate}>
                                                                        {joinedDate}
                                                                    </time>
                                                                </dd>
                                                            </div>
                                                            </>
                                                        )}
                                                    </dl>

                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
     );
}
 
export default ProfileDrawer;