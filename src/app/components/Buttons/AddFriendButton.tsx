import { User } from "@prisma/client";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { TbFaceId, TbFaceIdError } from "react-icons/tb";

interface AddFriendButtonProps {
  data: User;
}

const AddFriendButton: React.FC<AddFriendButtonProps> = ({ data }) => {
  useEffect(() => {
    // console.log('AddFriendButton data', data);
  }, []);

  const handleAddMe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newFriendId = data.id;

    try {
    const response = await axios.post("/api/friends", { newFriendId });
    if (response.status === 400) {
        toast.success("Your already friends!", {
            style: {
                background: "white",
                color: "green",
              },
              icon: <TbFaceId size={30} />,
          });
      } else {
        toast.success("Friend added!", {
            style: {
                background: "white",
                color: "green",
              },
              icon: <TbFaceId size={30} />,
          });
      }


    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-end">
        <button onClick={handleAddMe} className="flex hover:underline">
          Add me
        </button>
      </div>
    </>
  );
};

export default AddFriendButton;
