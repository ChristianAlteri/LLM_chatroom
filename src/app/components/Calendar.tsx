import { EventDetails } from '@prisma/client';
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
    isSameDay
  } from 'date-fns'
import { forEach } from 'lodash';
  import { useEffect, useState } from 'react'
  import { PiArrowCircleLeftLight, PiArrowCircleRightLight } from "react-icons/pi";

  
  let colStartClasses = [
      '',
      'col-start-2',
      'col-start-3',
      'col-start-4',
      'col-start-5',
      'col-start-6',
      'col-start-7',
    ]
    
    
    function classNames(...classes: any[]) {
        // console.log(classes);
        return classes.filter(Boolean).join(' ')
    }
    
    interface CalendarProps {
      updateSelectedDay: (newSelectedDay: Date) => void;
      eventDetails: EventDetails;
    }
  
  export default function Calendar(
    { 
        updateSelectedDay, 
        eventDetails }
        : CalendarProps) 
    {
    let today = startOfToday()
    let nextSaturday = nextDay(new Date(today), 6)
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
    
  
    let days = eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: endOfMonth(firstDayCurrentMonth),
    })

    useEffect(() => {
        eventDetails.potentialDates.forEach((date: any) => {
          console.log("potentialDate: ", date);
        });
        console.log("EVENT DETAILS: ", eventDetails);
      }, [eventDetails]);

    // Other users days they have selected
    let otherDay = nextSaturday

    // TODO: fix to corectly show days in the past
    let thePast = days.map(day => day < startOfToday())
  
    function previousMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
  
    function nextMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
    
    // console.log("selectedDay", selectedDay);
    // console.log("otherDay", otherDay);
  
    return (
      <div className="flex flex-col p-2">
              <div className="flex items-center ">
                <div className='flex flex-row w-full justify-between' >
                    <h2 className="font-semibold text-slate-900">
                    {format(firstDayCurrentMonth, 'MMMM yyyy')}
                    </h2>
                    <div
                    className='flex flex-row'
                    >
                        <button
                        type="button"
                        onClick={previousMonth}
                        className="-my-1.5 flex flex-none items-center justify-center  text-slate-400 hover:text-slate-800"
                        >
                        <span className="sr-only">Previous month</span>
                        <PiArrowCircleLeftLight  className="w-5 h-5" aria-hidden="true" />
                        </button>
                        <button
                        onClick={nextMonth}
                        type="button"
                        className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center  text-slate-400 hover:text-slate-800"
                        >
                        <span className="sr-only">Next month</span>
                        <PiArrowCircleRightLight  className="w-5 h-5" aria-hidden="true" />
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
                      'py-1.5'
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => {
                          setSelectedDay(day);
                          updateSelectedDay(day);
                      }}
                      className={classNames(
                          // hover
                          !isEqual(day, selectedDay) && 'hover:bg-blue-100',
                          (isEqual(day, selectedDay) || isToday(day)) &&
                            'font-semibold',

                          // If the day is selected and is the same as otherDay, then you are both free on that day
                          
                        isSameDay(day, selectedDay) &&
                            isSameDay(day, otherDay) &&
                            'bg-emerald-500',

                        //  Shows today
                        isEqual(day, selectedDay) && 'text-white',
                        !isEqual(day, selectedDay) &&
                          isToday(day) &&
                          'text-blue-500',

                        // Days in this month 
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          'text-slate-900',

                        // days in other months 
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          'text-slate-400',

                        //  selectedDay is the today
                        isEqual(day, selectedDay) && isToday(day) && 'bg-red-400 border-2',

                        // selectedDay 
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          'bg-blue-300 border-2',


                        //   otherDay should ne what other users have selected as their available days
                        isEqual(day, otherDay) && 'bg-pink-200 border-2',

                        // mark days in the past as gray
                        day < startOfToday() && 'bg-slate-100 border-2',
                        'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                      )}
                    >
                      <time dateTime={format(day, 'yyyy-MM-dd')}>
                        {format(day, 'd')}
                      </time>
                    </button>
                  </div>
                ))}
              </div>
      </div>
    )}
  
  