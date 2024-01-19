'useClient'

import React, { use, useEffect, useState } from "react";
import { PiPersonSimpleThrowDuotone } from "react-icons/pi";
import Checkbox from "../inputs/CheckBox";
import { Conversation, EventDetails, User } from "@prisma/client";

interface RemindersProps {
  admin: boolean;
  eventDetails: EventDetails
  conversation: Conversation & {
    users: User[];
  };
}

const Reminders: React.FC<RemindersProps> = ({ 
  admin, 
  eventDetails,
  conversation,
}) => {
  const [reminder, setReminder] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string[] | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>("");
  const [allUserIds, setAllUserIds] = useState<string[] | null>(null);

  
  useEffect(() => {
    const users = conversation?.users || [];
    const filteredUsers = users.filter((user) => user !== null);
    const userIds = filteredUsers.map((user) => user.id);
    setAllUserIds(userIds);
    if (userIds.length > 0) {
      setSelectedUserId(userIds);
      setSelectedUserName("Everyone");
    }
  }, [conversation]);
  
  const handleReminderSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Selected UserId:", selectedUserId?.toString());
    
    // console.log("allUserIds", allUserIds);
    // Build the reminders object
    
    const remindersObject = {
      createdAt: new Date(),
      userId: selectedUserId, 
      userName: selectedUserName,
      reminder: reminder,
      note: note,
      completed: false,
    };

    // Now you can use the remindersObject as needed, for example, store it in the state or send it to an API.
    console.log(remindersObject);

    // Clear the input fields
    setReminder("");
    setNote("");
  };

  return (
    <div className="flex flex-col border border-slate-900 rounded-md overflow-y-auto h-1/3 w-3/3">
      {/* Selecter */}

      <div className="absolute right-1/2 flex items-center justify-center">
        <select
          className=" 
                  text-xs
                  p-1
                    "
        >
          <option>Date</option>
          <option>My reminders</option>
        </select>
      </div>
      <div className="p-2 w-full mx-auto">
        <div className="space-y-2 flex w-full items-center justify-center">
          <div className="flex flex-col items-center overflow-y-auto">
            <div className="text-sm w-full h-full">
              {/* Map over this and pass reminder and completed from DB */}
              <Checkbox reminder="reminder" completed={true} />
              <Checkbox reminder="reminder" completed={false} />
              <Checkbox reminder="ahahahahhahahahahsjdsdkha" completed={true} />
              <Checkbox reminder="reminder" completed={true} />
              <Checkbox reminder="reminder" completed={true} />
              <Checkbox reminder="reminder" completed={true} />
              <Checkbox reminder="reminder" completed={true} />
              <Checkbox reminder="reminder" completed={true} />
              <Checkbox reminder="reminder" completed={true} />
              <Checkbox reminder="reminder" completed={true} />
              <Checkbox reminder="reminder" completed={true} />
              <Checkbox reminder="reminder" completed={true} />
              <Checkbox reminder="reminder" completed={true} />
              <Checkbox reminder="reminder" completed={true} />
              <div className=" text-white flex flex-row gap-1 bottom-0 w-full">
                Add reminders
              </div>
            </div>
            {admin && (
              <div className="flex">
                <form
                  className="flex flex-row gap-1 w-full"
                  onSubmit={(e) => handleReminderSubmission(e)}
                >
                  <div className="flex flex-col rounded-md hover:cursor-pointer hover:text-black focus:ring-2 focus:ring-blue-200 border">
                    <input
                      className="p-2 gap-2 text-md text-semibold text-slate-900"
                      type="text"
                      placeholder="Set a reminder"
                      value={reminder}
                      onChange={(e) => setReminder(e.target.value)}
                    />
                    <div className="flex w-full flex-row">
                      <input
                        className="p-2 w-full text-xs text-slate-600"
                        type="text"
                        placeholder="Set a note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                      <select
                        className="text-xs p-1"
                        value={selectedUserId || ""}
                        onChange={(e) => {
                          const userId = e.target.value;
                          //@ts-ignore
                          setSelectedUserId(userId || null);
                          setSelectedUserName(e.target.options[e.target.selectedIndex].text);
                        }}
                      >
                        <option value={allUserIds}>Everyone</option>
                        {conversation.users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="
                        rounded-md
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
                      size={25}
                      className="text-slate-500 hover:text-black"
                    />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
