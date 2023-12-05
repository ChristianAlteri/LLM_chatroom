"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { TbPhotoFilled } from "react-icons/tb";
import MessageInput from "./MessageInput";
import { FaPersonRunning } from "react-icons/fa6";
import { PiPersonSimpleThrowBold, PiPersonSimpleThrowDuotone } from "react-icons/pi";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      messages: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId
    })
  }

  return (
  
    <div
        className="
            py-4 
            px-4 
            bg-slate-100
            border-slate-200 
            border-t 
            flex 
            items-center 
            gap-2 
            lg:gap-4 
            w-full
            " 
        >
        {/* Message bar sidebar navigation for file upload or photo upload */}
        <form 
            onSubmit={() => {}}
            className="flex items-center gap-2 lg:gap-4 "
        >
          <button
            type="submit"
            className="
            rounded-xl
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
                <HiPhoto size={26} className="
                text-slate-500
                hover:text-black
                " 
                />
          </button>
        </form>

        {/* Send message button */}
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className=" flex items-center gap-2 lg:gap-4 w-full"
        >
            <MessageInput 
                id='message'
                register={register}
                errors={errors}
                required
                placeholder='Send a message'
            />
            <button
            type="submit"
            className="
            rounded-xl
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
                size={24} 
                className="text-slate-500 hover:text-black" />
            </button>
        </form>
    </div>
  );
};

export default Form;
