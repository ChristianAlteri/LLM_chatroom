'use client'

import { useRouter } from "next/navigation";
import useConversation from "../hooks/useConversation";
import { useCallback, useState } from "react";
import axios from "axios";
import { on } from "events";
import toast from "react-hot-toast";
import Modal from "./modals/Modal";

import { FiAlertTriangle } from 'react-icons/fi'
import { Dialog } from "@headlessui/react";

import Button from "@/app/components/Buttons/Button"


interface ConfirmModalProps {
    isOpen?: boolean;
    onClose: () => void;

}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose
}) => {
    const router = useRouter();
    const { conversationId } = useConversation()
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = useCallback(()=> {
        setIsLoading(true);
        axios.delete(`/api/conversations/${conversationId}`)
        .then(() => {
            onClose()
            router.push('/conversations')
            router.refresh()
        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false))
    }, [conversationId, router, onClose])
    return ( 
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="sm:flex sm:items-start">
                <div className="
                mx-auto
                flex
                h-12
                w-12
                flex:shrink-0
                items-center
                justify-center
                rounded-md
                bg-rose-500
                sm:mx-0
                sm:h-10
                sm:w-10
                "
                >
                    <FiAlertTriangle 
                    className="h-6 w-6 text-white"
                    />
                    
                </div>
                <div
                className="
                mt-3
                text-center
                sm:mt-0
                sm:ml-4
                sm:text-left
                "
                >
                    <Dialog.Title
                    as='h3'
                    className="
                    text-base 
                    font-medium
                    leading-6
                    text-slate-500
                    hover:underline
                    hover:text-slate-900
                    hover:cursor-pointer
                    ">
                        Delete conversation
                    </Dialog.Title>
                    <div
                    className="
                    mt-2
                    "
                    >
                        <p
                        className="
                        text-xs
                        text-slate-500
                        "
                        >
                            Are you sure you want to delete this conversation?<br></br> This action cannot be reversed!
                        </p>
                    </div>
                </div>
            </div>
            <div
            className="
            mt-5
            sm:mt-4
            sm:flex
            sm:flex-row-reverse
            "
            >
            <Button
                disabled={isLoading}
                onClick={onDelete}
                danger
                >Delete
            </Button>
            <Button
                disabled={isLoading}
                onClick={onClose}
                secondary
                >Cancel
            </Button>
            </div>
        </Modal>
    );
}
 
export default ConfirmModal;