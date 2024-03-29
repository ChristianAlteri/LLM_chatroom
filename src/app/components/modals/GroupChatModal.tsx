'use client'

import axios from "axios";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "@/app/components/modals/Modal";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import Button from "@/app/components/Buttons/Button";

interface GroupChatModalProps {
    isOpen?: boolean;
    onClose: () => void;
    users: User[];
    allFriends: User[];
}


const GroupChatModal: React.FC<GroupChatModalProps> = ({
    isOpen,
    onClose,
    users = [],
    allFriends = []
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }

    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: []
        }
    });

    const members = watch('members');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log('inside axios.post/api/conversations data: ', data);
        axios.post('/api/conversations', {
            ...data,
            isGroup: true
          })
          .then(() => {
            router.refresh();
            onClose();
          })
          .catch(() => toast.error('Something went wrong!'))
          .finally(() => setIsLoading(false));
        }

    return ( 
            <Modal isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-slate-900/10 pb-10">
                        <h2
                        className="
                        text-base
                        font-bold
                        leading-7
                        text-slate-900
                        "
                        >
                            Create a group chat
                        </h2>
                        <p
                        className="
                        mt-1
                        text-xs
                        leading-6
                        text-slate-500
                        "
                        >
                            Create a group chat with more than 2 people
                        </p>
                        <div
                        className="
                        mt-7
                        flex
                        flex-col
                        gap-y-8
                        "
                        >
                            <Input 
                            register={register}
                            label='Name'
                            id='name'
                            disabled={isLoading}
                            required
                            errors={errors}
                            />
                            {/* <Select 
                                disabled={isLoading}
                                label='Members'
                                options={users.map((user) => ({
                                    value: user.id,
                                    label: user.name
                                }))}
                                onChange={(value) => setValue('members', value, {
                                    shouldValidate: true
                                })}
                                value={members}
                            /> */}
                            <Select 
                                disabled={isLoading}
                                label='Members'
                                options={allFriends.map((friend) => ({
                                    value: friend.id,
                                    label: friend.name
                                }))}
                                onChange={(value) => setValue('members', value, {
                                    shouldValidate: true
                                })}
                                value={members}
                            />
                        </div>
                    </div>
                </div>
                <div className="
                mt-7
                flex
                items-center
                gap-x-3
                ">
                    <Button 
                    disabled={isLoading}
                    onClick={onClose}
                    secondary 
                    type="button"
                    >
                        Cancel
                    </Button>
                    <Button disabled={isLoading} type="submit">
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
     );
}
 
export default GroupChatModal;