'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    id: string;
    register: UseFormRegister<FieldValues>;
    type?: string;
    errors: FieldErrors;
    required: boolean;
    placeholder?: string;

}

const MessageInput: React.FC<MessageInputProps> = ({
    id,
    register,
    type,
    errors,
    required,
    placeholder,
}) => {
    return ( 
        <div className="relative w-full">
        <input
          id={id}
          type={type}
          autoComplete={id}
          {...register(id, { required })}
          placeholder={placeholder}
          className="
            text-black
            font-semibold
            py-2
            px-4
            bg-slate-100 
            w-full 
            rounded-xl
            focus:bg-blue-100
            focus:outline-none 
            focus:ring
             focus:border-blue-500

          "
        />
      </div>
    )
}
 
export default MessageInput;