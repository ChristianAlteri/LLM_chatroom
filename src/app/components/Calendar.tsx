import { Conversation, EventDetails, User } from "@prisma/client";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  nextDay,
  isSameDay,
} from "date-fns";
import { forEach, set } from "lodash";
import { useEffect, useState } from "react";
import {
  PiArrowCircleLeftLight,
  PiArrowCircleRightLight,
} from "react-icons/pi";
import getPotentialDatesByEventId from "../actions/getPotentialDatesByEventId";
import getCurrentUser from "../actions/getCurrentUser";

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

function classNames(...classes: any[]) {
  // console.log(classes);
  return classes.filter(Boolean).join(" ");
}

interface CalendarProps {
  updateSelectedDay: (newSelectedDay: Date) => void;
  eventDetails: EventDetails;
  conversation: Conversation & {
    users: User[];
  };
  currentUser: User;
}

export default function Calendar({
  updateSelectedDay,
  eventDetails,
  conversation,
  currentUser,
}: CalendarProps) {
  let today = startOfToday();
  let [admin, setAdmin] = useState(false);
  let [chosenDate, setChosenDate] = useState<Date | null>(null);
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let [dateArray, setDateArray] = useState<Date[]>([]);
  let [dateMap, setDateMap] = useState(new Map());
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

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
    // console.log(dateCountMap);
  }, [dateArray]);

  /* Creating an Admin */  
  useEffect(() => {
    if (currentUser?.id === conversation?.creatorId) {
      setAdmin(true);
    }
  }, [admin]);

  useEffect(() => {
    const chosenDate = eventDetails?.chosenDate
    setChosenDate(chosenDate)
  }, [chosenDate])

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }


  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center ">
        <div className="flex flex-row w-full justify-between">
          <h2 className="font-semibold text-slate-900">
            {format(firstDayCurrentMonth, "MMMM yyyy")}
          </h2>
          <div className="flex flex-row">
            <button
              type="button"
              onClick={previousMonth}
              className="-my-1.5 flex flex-none items-center justify-center  text-slate-400 hover:text-slate-800"
            >
              <span className="sr-only">Previous month</span>
              <PiArrowCircleLeftLight className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={nextMonth}
              type="button"
              className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center  text-slate-400 hover:text-slate-800"
            >
              <span className="sr-only">Next month</span>
              <PiArrowCircleRightLight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-slate-500">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="grid grid-cols-7 mt-2 text-sm">
        {days.map((day, dayIdx) => (
          <div
            key={day.toString()}
            className={classNames(
              dayIdx === 0 && colStartClasses[getDay(day)],
              "py-1.5"
            )}
          >
            <button
              type="button"
              onClick={() => {
                setSelectedDay(day);
                updateSelectedDay(day);
              }}
              className={classNames(
                dateArray.some((potentialDate) =>
                  isSameDay(day, potentialDate)
                ) && "bg-amber-300 border-2",
                // hover
                !isEqual(day, selectedDay) && "hover:bg-blue-100",
                (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",

                // If the day is selected and is the same as otherDay, then you are both free on that day

                // isSameDay(day, selectedDay) &&
                //     isSameDay(day, potentialDates) &&
                //     'bg-emerald-500',

                //  Shows today
                isEqual(day, selectedDay) && "text-white",
                !isEqual(day, selectedDay) && isToday(day) && "text-blue-500",

                // Days in this month
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  isSameMonth(day, firstDayCurrentMonth) &&
                  "text-slate-900",

                // days in other months
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  !isSameMonth(day, firstDayCurrentMonth) &&
                  "text-slate-400",

                //  selectedDay is the today
                isEqual(day, selectedDay) &&
                  isToday(day) &&
                  "bg-red-400 border-2",

                // selectedDay
                isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  "bg-blue-300 border-2",

                // mark days in the past as red
                day < startOfToday() && "bg-slate-100 border-2",
                "mx-auto flex h-8 w-8 items-center justify-center rounded-full",
                // If Chosen date
                isEqual(day, chosenDate!) && "bg-emerald-400 border-2 text-white"
              )}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
