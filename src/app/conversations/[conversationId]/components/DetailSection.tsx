"use client";

import React, { useEffect, useState } from "react";
import { Conversation, EventDetails, User } from "@prisma/client";

import CalendarModal from "@/app/components/modals/WidgetModal";
import Button from "@/app/components/Button";

import axios from "axios";

import { format } from "date-fns";

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
  let [admin, setAdmin] = useState(false);

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
            text-center
            h-1/5
            border
            border-slate-900
            "
      >
        <div className="flex p-4">Chosen date: {formattedChosenDate}</div>
        <h1 className="flex p-4">{eventDetails?.description!}</h1>
        {admin && (
          <form className="flex p-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Pin a header"
              value={description}
              onChange={handleEventDescription}
            />
            <button type="submit">Submit</button>
          </form>
        )}

        <CalendarModal
          label="CalendarModal"
          id="calendarModal"
          conversation={conversation}
          currentUser={currentUser}
          eventDetails={eventDetails}
        />
      </div>
    </>
  );
};

export default DetailSection;
