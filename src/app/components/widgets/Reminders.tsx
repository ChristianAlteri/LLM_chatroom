"useClient";

import React, { useEffect, useState } from "react";
import { PiPersonSimpleThrowDuotone } from "react-icons/pi";
import Checkbox from "../inputs/CheckBox";
import { Conversation, EventDetails, User } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";

interface RemindersProps {
  admin: boolean;
  eventDetails: EventDetails;
  conversation: Conversation & {
    users: User[];
  };
  currentUser: User;
}

const Reminders: React.FC<RemindersProps> = ({
  admin,
  eventDetails,
  conversation,
  currentUser,
}) => {
  const [reminder, setReminder] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string[] | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>("");
  const [allUserIds, setAllUserIds] = useState<string[] | null>(null);
  const [arrayOfReminders, setArrayOfReminders] = useState<string[] | null>(
    null
  );
  const [displayOption, setDisplayOption] = useState<string>("All");

  useEffect(() => {
    //@ts-ignore
    const reminders = eventDetails?.reminders;
  }, [eventDetails]);

  // Set selectedUserId to all users and handles the "Everyone" option if nothing is selected
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

  // API call to create a reminder
  const handleReminderSubmission = (e: React.FormEvent) => {
    e.preventDefault();

    // Check to see if the selectedUserId includes "Everyone"
    let userIdsToSet;
    if (selectedUserId && selectedUserId.includes("Everyone")) {
      userIdsToSet = allUserIds;
    } else {
      userIdsToSet = selectedUserId || [];
    }

    try {
      const response = axios.post("/api/event-details/reminders", {
        eventDetailsId: eventDetails.id,
        conversationId: conversation.id,
        createdAt: new Date(),
        userId: userIdsToSet,
        name: selectedUserName,
        reminder: reminder,
        note: note,
        completed: false,
      });
      toast.success("Reminder set!");
      console.log(
        "Server response:",
        response.then((res) => console.log(res.data))
      );
    } catch (error) {
      console.error("Error submitting reminders:", error);
    }

    setReminder("");
    setNote("");
    setSelectedUserId(null);
    setSelectedUserName("");
  };

  useEffect(() => {
    //@ts-ignore
    const reminders = eventDetails?.reminders;
    let filteredReminders = reminders;

    if (reminders) {
      if (displayOption === "My reminders") {
        filteredReminders = reminders.filter(
          //@ts-ignore
          (reminder) => currentUser?.id === reminder.userId
        );
      }
      console.log("Filter", displayOption, filteredReminders);
      // Add more conditions based on other options if needed

      setArrayOfReminders(filteredReminders);
      console.log("arrayOfReminders", arrayOfReminders);
    }
  }, [eventDetails, currentUser?.id, displayOption]);

  return (
    <div className="flex flex-col border border-slate-900 rounded-md overflow-y-auto h-1/3 w-3/3">
      {/* Selecter */}

      <div className="absolute right-1/2 flex items-center justify-center">
        <select
          className="text-xs p-1"
          value={displayOption}
          onChange={(e) => setDisplayOption(e.target.value)}
        >
          <option value="All">All</option>
          <option value="My reminders">My reminders</option>
          <option value="Date">Date</option>
        </select>
      </div>
      <div className="p-2 w-full mx-auto">
        <div className="space-y-2 flex w-full items-center justify-center">
          <div className="flex flex-col items-center overflow-y-auto">
            <div className="text-sm w-full h-full">
              {/* Map over reminders and pass data */}
              {/* {
                //@ts-ignore
                eventDetails?.reminders?.map((reminderObj, index) => (
                  <Checkbox
                    key={index}
                    reminder={reminderObj.reminder}
                    note={reminderObj.note}
                    completed={reminderObj.completed}
                    name={reminderObj.name}
                    eventDetails={eventDetails}
                  />
                ))
              } */}
              {
                //@ts-ignore
                arrayOfReminders?.map((reminderObj, index) => (
                  <Checkbox
                    key={index}
                    //@ts-ignore
                    reminder={reminderObj.reminder}
                    //@ts-ignore
                    note={reminderObj.note}
                    //@ts-ignore
                    completed={reminderObj.completed}
                    //@ts-ignore
                    name={reminderObj.name}
                    eventDetails={eventDetails}
                  />
                ))
              }
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
                          setSelectedUserName(
                            e.target.options[e.target.selectedIndex].text
                          );
                        }}
                      >
                        {/* //@ts-ignore */}
                        <option value="Everyone">Everyone</option>
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
