"use client";

import React, { useEffect, useState } from "react";
import { Conversation, EventDetails, User } from "@prisma/client";



import WidgetModal from "@/app/components/modals/WidgetModal";
import NewEventModal from "@/app/components/modals/NewEventModal";

import axios from "axios";

import { format } from "date-fns";
import { PiPersonSimpleThrowDuotone } from "react-icons/pi";


interface DetailSectionProps {
  conversation: Conversation & {
    users: User[];
  };
  currentUser: User;
  eventDetails: EventDetails;
}

const DetailSection: React.FC<DetailSectionProps> = ({
  conversation,
  currentUser,
  eventDetails,
}) => {
  const [description, setEventDescription] = useState<string>("");
  const [admin, setAdmin] = useState(false);
  const [newEventModal, setNewEventModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

const handleClose = () => {
  setIsModalOpen(false);
};

  //   Creating an ADMIN
  useEffect(() => {
    if (currentUser?.id === conversation?.creatorId) {
      setAdmin(true);
    }
  }, [admin]);

  const handleEventDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEventDescription(event.target.value);
  };

  const handleNewEvent = () => {
    setNewEventModal(true)
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Make a POST request to your API endpoint
      const response = axios.post("/api/event-details", {
        userId: currentUser.id,
        conversationId: conversation.id,
        description: description,
      });

      // Handle the response as needed
      // console.log('Server response:', response);
    } catch (error) {
      // Handle errors
      console.error("Error submitting event details:", error);
    }
  };

  const formattedChosenDate =
  eventDetails?.chosenDate &&
  format(new Date(eventDetails.chosenDate), "MM/dd/yyyy");


  return (
    <>
      <div
        className="
            flex
            flex-col
            justify-center
            h-1/5
            border
            border-slate-900
            "
      >
        <div className="flex flex-row gap-2 justify-between p-20">

            {/* Date display */}
            <div className="flex flex-col border border-slate-900">Chosen date: {formattedChosenDate}</div>
            {/* Pin a Header */}
            <div className="flex flex-col border border-slate-900">
                <h1 className="flex flex-row">{eventDetails?.description!}</h1>
                {admin && (
                <form className="flex flex-row" onSubmit={handleSubmit}>
                    <input
                    className="rounded-md hover:text-black  border"
                    type="text"
                    placeholder="Pin a header"
                    value={description}
                    onChange={handleEventDescription}
                    />
                    <button
                        type="submit"
                        className="
                            rounded-md
                            p-1
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
                )}
            </div>
            <div className="border border-slate-900">
            <WidgetModal
            label="WidgetModal"
            id="widgetModal"
            conversation={conversation}
            currentUser={currentUser}
            eventDetails={eventDetails}
            />
            </div>
            {/* Point conversation to a new event details*/}
                <div className="flex flex-col border border-slate-900">
                    <button onClick={handleNewEvent} className="text-red-400 hover:underline">New Event</button>
                    {newEventModal && (<NewEventModal onClose={handleClose}  conversation={conversation} />)}
                </div>
            </div>
      </div>
    </>
  );
};

export default DetailSection;
