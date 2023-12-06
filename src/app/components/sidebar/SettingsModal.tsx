"use client";

import axios from "axios";
import toast from "react-hot-toast";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "../modals/Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import Button from "../Button";

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12 ">
          <div className="border-b border-slate-900/10 pb-12">
            <h2
              className="
                        text-base
                        font-semibold
                        leading-7
                        text-slate-900
                        bg-slate-200
                        "
            >
              Profile
            </h2>
            <p className="mt-1 text-xs leading-6 text-slate-500">
              Edit your profile.
            </p>
            <div
              className="
                        mt-10
                        flex
                        flex-col
                        gap-y-8
                        "
            >
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label
                  className="
                                block
                                text-sm
                                font-medium
                                leading-6
                                text-slate-900
                                "
                >
                  Photo
                </label>
                <div
                  className="
                                mt-2
                                flex
                                items-center
                                gap-x-3
                                "
                >
                  <Image
                    width="48"
                    height="48"
                    className="rounded-full"
                    src={
                      image || currentUser?.image || "/images/placeholder.jpg"
                    }
                    alt="Avatar"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="
                    mt-10
                    flex
                    items-center
                    gap-x-3
                    "
        >
          <Button disabled={isLoading} secondary onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
