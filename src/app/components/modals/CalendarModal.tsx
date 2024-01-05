"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CgCloseR } from "react-icons/cg";
import Calendar from "../Calendar";
import { Conversation, EventDetails, User } from "@prisma/client";
import getEventDetails from "@/app/actions/getEventDetails";

import { parseISO } from 'date-fns';
import axios from "axios";
import DateSideBar from "../DateSideBar";

interface CalendarModalProps {
  label: string;
  id: string;
  children?: React.ReactNode;
  conversation: Conversation & {
    users: User[];
  };
  currentUser: User;
  eventDetails: EventDetails;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  label,
  id,
  children,
  conversation,
  currentUser,
  eventDetails,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date>();
  const inputRef = useRef<HTMLInputElement>(null);
  let [admin, setAdmin] = useState(false);
  let [dateArray, setDateArray] = useState<Date[]>([]);
  let [dateMap, setDateMap] = useState(new Map());

  //   console.log("conversation", conversation);
    // console.log("eventDetails", eventDetails);
  //   console.log("CurrentUser", currentUser);

  // Form open and close
  const closeModal = () => {
    setModalOpen(false);
    // onClose();
  };
  const openModal = () => {
    setModalOpen(true);
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

/* Potential Date Array */  
//   Watch for changes to potential dates and update the dateArray
useEffect(() => {
    // console.log("EVENT DETAILS: ", eventDetails);
    //@ts-ignore
    const potentialDates = eventDetails?.potentialDates;
    let tempDateArray: Date[] = [];

    if (potentialDates) {
      potentialDates.forEach((potentialDate: any) => {
        const date = potentialDate.date;
        tempDateArray.push(date);
      });
      setDateArray(tempDateArray);
    //   console.log("dateArray", tempDateArray);
    }
  }, [eventDetails]);

  /* Potential Date Map */  
// Watch for dateArray changes and update the dateMap
  useEffect(() => {
    const dateCountMap = new Map();

    dateArray.forEach((date) => {
      const dateString = date.toISOString(); // Convert date to string for consistent comparison
      dateCountMap.set(dateString, (dateCountMap.get(dateString) || 0) + 1);
    });
    setDateMap(dateCountMap);
    // console.log("dateMap", dateMap);
  }, [dateArray]);


//   Function to change selected day then uesEffect to watch for changes
  useEffect(() => {
    // console.log("selectedDay from CalendarModal", selectedDay);
  }, [selectedDay]);
    const updateSelectedDay = (newSelectedDay: Date) => {
        setSelectedDay(newSelectedDay);
    };

    //   Creating an ADMIN
  useEffect(() => {
    if (currentUser?.id === conversation?.creatorId) {
      setAdmin(true);
    }
}, [admin]);

  //   Handles submission of calendar details
  const submitPotentialDates: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    const parsedDate =  parseISO(selectedDay!.toISOString());

    try {
        const response = axios.post('/api/event-details/potential-dates', {
            userId: currentUser.id,
            conversationId: conversation.id,
            eventDetailsId: eventDetails.id,
            date: parsedDate,

        });

        // console.log('Server response:', response);
        // console.log("From button", selectedDay);

    } catch (error) {
      console.error("Error submitting event details:", error);
    }
  };

  return (
    <>
      <div
        className="
        hover:underline
        hover:cursor-pointer
        "
        onClick={openModal}
      >
        Calendar
      </div>

      <div className="modal-overlay">
        <div className="modal-content">
          <Transition.Root show={modalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-800"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-800"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div
                  className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  fixed
                  inset-0
                  bg-blue-100
                  bg-opacity-70
                  transition-opacity
                "
                ></div>
              </Transition.Child>

              <div className="fixed border inset-5 overflow-y-auto flex items-center justify-center">
                <div
                  className="
                inset-5
                  flex 
                  flex-col
                  items-center 
                  justify-center 
                  p-3
                  text-center
                  rounded-md
                  border
                  border-slate-900
                  bg-white
                  h-full
                  w-full
                "
                >
                  {/* Components container */}
                  <div className="w-full h-full flex flex-col">
                    {/*  Buttons */}
                        <div className="flex flex-row w-full gap-4 items-center p-1 justify-between text-slate-900">
                        <h1 className="font-bold ">Calendar</h1>
                        <div>Filter by attendee</div>
                        <div>Log your calendar in</div>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="
                            items-end
                            rounded-md 
                            bg-slate-50 
                            text-slate-400 
                            hover:text-black
                            "
                        >
                            <span className="sr-only">Close</span>
                            <CgCloseR
                            className="bg-blue-50 h-6 w-6"
                            aria-hidden="true"
                            />
                        </button>
                        </div>
                            <div className="
                            flex
                            flex-row
                            w-full
                            justify-center
                            gap-9
                            p-5
                         " > 
                         <DateSideBar dateMap={dateMap} /> 
                  {/* Container for calander */}
                    <div
                    className="
                    flex
                    flex-col
                    "
                    >
                        
                        TOP
                    <div>
                  </div>
                    {/* Calendar */}
                        
                        <Calendar 
                        updateSelectedDay={updateSelectedDay} 
                        eventDetails={eventDetails}
                        conversation={conversation}
                        currentUser={currentUser}
                        />
                        {/* Sub potential dates button */}
                        <div className="flex flex-col w-full gap-5 justify-end">
                            <button
                            className="
                            flex
                            justify-center
                            p-2
                            border
                            border-slate-300
                            rounded-md
                            hover:border-slate-900
                            hover:bg-blue-100
                            "
                            onClick={submitPotentialDates}
                            >
                            Submit potential dates
                            </button>
                        </div>
                        {admin && (
                            <div className="flex flex-col w-full gap-5 justify-end">
                                <button
                                className="
                                flex
                                
                                justify-center
                                p-2
                                border
                                border-slate-300
                                rounded-md
                                hover:border-slate-900
                                hover:bg-green-100
                                "
                                onClick={submitPotentialDates}
                                >
                                Choose date
                                </button>
                            </div>
                            )}
                    </div>
                    </div>
                    </div>
                    {/* Submit button */}
                    <div className="flex flex-row w-full gap-5 justify-end">
                        <button
                            className="
                            flex flex-row gap-5 justify-end
                            p-2
                            border
                            border-slate-300
                            rounded-md
                            hover:border-slate-900
                            hover:bg-emerald-100
                            "
                            onClick={() => console.log("Submit button")}
                            >
                            Submit
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
          </Transition.Root>
        </div>
      </div>
    </>
  );
};

export default CalendarModal;
