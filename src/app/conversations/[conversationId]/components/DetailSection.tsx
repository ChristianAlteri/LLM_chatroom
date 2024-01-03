'use client'

import React, { useState } from 'react';
import { Conversation, EventDetails, User } from "@prisma/client";
import CalendarModal from '@/app/components/modals/CalendarModal';
import axios from 'axios';

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
    eventDetails
}) => {

    const [description, setEventDescription] = useState<string>('');


    const handleEventDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEventDescription(event.target.value);
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // Make a POST request to your API endpoint
            const response = axios.post('/api/event-details', {
                userId: currentUser.id,
                conversationId: conversation.id,
                description: description,
            });

            // Handle the response as needed
            // console.log('Server response:', response);
        } catch (error) {
            // Handle errors
            console.error('Error submitting event details:', error);
        }



    };

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
                <h1>{eventDetails?.description!}</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder='Add event details'
                        value={description}
                        onChange={handleEventDescription}
                    />
                    <button type="submit">Submit</button>
                </form>

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
}

export default DetailSection;
