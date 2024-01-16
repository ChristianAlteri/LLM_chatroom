"use client";

import { use, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";

import { LuCalendarCheck } from "react-icons/lu";
import { Conversation, EventDetails, User } from "@prisma/client";
import axios from "axios";
import { parseISO } from "date-fns";

interface DateSideBarProps {
  dateMap: Map<string, number>;
  eventDetails: EventDetails;
  conversation: Conversation & {
    users: User[];
  };
  currentUser: User;
  updateDateSideBarSelection: (newSelectedDay: Date) => void;
}

const DateSideBar: React.FC<DateSideBarProps> = ({
  dateMap,
  eventDetails,
  conversation,
  currentUser,
  updateDateSideBarSelection,
}) => {
  useEffect(() => {
    const sortedDates = Array.from(dateMap.entries()).sort(
      (a, b) => b[1] - a[1]
    );
  }, [dateMap]);
  const [chosenDate, setChosenDate] = useState<Date | null>(null);
  const sortedDates = Array.from(dateMap.entries()).sort((a, b) => b[1] - a[1]);
  const [selected, setSelected] = useState(sortedDates[0]);

  // const [selected, setSelected] = useState(Array.from(dateMap.entries())[0]);
  // const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const isDateChosen = (date: string) => {
    return chosenDate && date === chosenDate.toISOString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    return `${day}${getOrdinalSuffix(day)} ${month}`;
  };

  // Function to get ordinal suffix (st, nd, rd, th)
  const getOrdinalSuffix = (number: number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = number % 100;
    return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  };

  useEffect(() => {
    const chosenDate = eventDetails?.chosenDate;
    setChosenDate(chosenDate);
  }, [chosenDate]);


  //   useEffect(() => {
  //     onSelectedChange && onSelectedChange(selected);
  //     // console.log(selected, "from DateSideBar");
  //   }, [selected, onSelectedChange]);
  

/* 

    //   Handles submission of Choose Date in the Event Details DB
    //   const chooseDate: React.MouseEventHandler<HTMLDivElement> = (event) => {
    //     event.preventDefault();

    //     const parsedDate =  parseISO(selected[0]!.toString());

    //     // console.log("Choose date", parsedDate);
    //     try {
    //       const response = axios.post('/api/event-details/chosen-date', {
    //           userId: currentUser.id,
    //           conversationId: conversation.id,
    //           eventDetailsId: eventDetails.id,
    //           date: parsedDate,

    //       });

    //       console.log('Server response:', response.then((res) => console.log(res.data)));
    //     } catch (error) {
    //       console.error("Error submitting event details:", error);
    //     }
    //   };

 */

  return (
    <div className="border-r border-slate-600 overflow-y-auto">
      <div className="px-4 py-16 overflow-y-auto">
        <div className="mx-auto max-w-md overflow-y-auto">
          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="space-y-2">
              {/* {Array.from(dateMap.entries()).map(([date, votes]) => ( */}
              {sortedDates.map(([date, votes]) => (
                <RadioGroup.Option
                  key={date}
                  value={{ name: date, vote: `${votes} Votes` }}
                  className={({ checked, active }) =>
                    `${
                      checked
                        ? " text-white"
                        : isDateChosen(date)
                        ? "bg-emerald-200 text-white"
                        : "bg-white"
                    }
                    relative border flex cursor-pointer rounded-lg px-5 py-4  hover:bg-blue-100 hover:border-slate-900 focus:outline-none
                    ${
                        active ? "bg-sky-200 text-white border border-slate-900" : ""}`
                  }
                  onClick={(event) => {
                    const parsedDate = parseISO(date);
                    updateDateSideBarSelection(parsedDate);
                  }}
                >
                  {({ checked }) => (
                    <div className="flex w-full items-center justify-center">
                      <div className="flex items-center  overflow-y-auto">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {formatDate(date)}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-slate-500"
                            }`}
                          >
                            <span>{`Votes: ${votes}`}</span>{" "}
                          </RadioGroup.Description>
                        </div>
                      </div>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default DateSideBar;
