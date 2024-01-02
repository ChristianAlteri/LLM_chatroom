'use client';

import React from 'react';
import { Conversation, User } from "@prisma/client";
import CalendarModal from '@/app/components/modals/CalendarModal';

interface DetailSectionProps {
    conversation: Conversation & {
      users: User[];
    };
  }

const DetailSection: React.FC<DetailSectionProps> = ({
    conversation
}) => {
    return ( 
        <>
            <div className='
            flex
            flex-col
            justify-center
            text-center
            h-1/5
            border
            border-slate-900
            '>
                <div>Details</div>
                <CalendarModal 
                label="CalendarModal"
                id="calendarModal"
                />
                {/* <div>Edit</div> */}
                <div>{conversation.userIds}</div>
            </div>

        </>
     );
}
 
export default DetailSection;