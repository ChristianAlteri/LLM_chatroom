"use client";

import { use, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";

import { LuCalendarCheck } from "react-icons/lu";

interface DateSideBarProps {
    dateMap: Map<string, number>;
}

const DateSideBar: React.FC<DateSideBarProps> = ({
    dateMap,
}) => {
    useEffect(() => {
        const sortedDates = Array.from(dateMap.entries()).sort((a, b) => b[1] - a[1]);
        console.log(sortedDates, "Sorted dates in DateSideBar");
    }, [dateMap]);

    const sortedDates = Array.from(dateMap.entries()).sort((a, b) => b[1] - a[1]);
    const [selected, setSelected] = useState(sortedDates[0]);

    // const [selected, setSelected] = useState(Array.from(dateMap.entries())[0]);
    // const [selectedDay, setSelectedDay] = useState<string | null>(null);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getUTCDate();
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
        return `${day}${getOrdinalSuffix(day)} ${month}`;
    };
    
    // Function to get ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (number: number) => {
        const suffixes = ["th", "st", "nd", "rd"];
        const v = number % 100;
        return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
    };

    // useEffect(() => {
    //     // TODO: Pass back selected day to calender and sync up displays
    //     console.log(selectedDay, "selectedDay in DateSideBar");
    //   }, [selectedDay]);

    return (
        <div className="border-r border-slate-600">
            <div className="px-4 py-16">
                <div className="mx-auto max-w-md">
                    <RadioGroup value={selected} onChange={setSelected}>
                        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                        <div className="space-y-2">
                            {/* {Array.from(dateMap.entries()).map(([date, votes]) => ( */}
                            {sortedDates.map(([date, votes]) => (
                                <RadioGroup.Option
                                    key={date}
                                    value={{ name: date, ram: `${votes} Votes` }}
                                    className={({ active, checked }) =>
                                        `${
                                            active
                                                ? "bg-emerald-100 border border-slate-900"
                                                : ""
                                        }
                                        ${checked ? "bg-sky-900/75 text-white" : "bg-white"}
                                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                    }
                                >
                                    {({ active, checked }) => (
                                        <div className="flex w-full items-center justify-center">
                                            <div className="flex items-center">
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
