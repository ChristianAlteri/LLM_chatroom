'use client'

import React, { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ScaleLoader } from 'react-spinners'

import { quantum, helix } from 'ldrs'


const LoadingModal = () => {
    helix.register()
    return ( 
        <Transition.Root show as={Fragment}>

            <Dialog as='div' className='relative z-50' onClose={() => {}}>
                <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                >
                    <div 
                        className='
                        fixed
                        inset-0
                        bg-blue-50
                        bg-opacity-75
                        transition-opacity
                        '
                    />
                </Transition.Child>
                <div
                className='
                fixed
                inset-0
                z-10
                overflow-y-auto
                '>
                    <div
                    className='
                    flex
                    min-h-full
                    items-center
                    justify-center
                    p-4
                    text-center
                    '>
                       <Dialog.Panel>
                        <l-quantum
                            size="40"
                            speed="3.5" 
                            color="rgb(99, 70, 99)" 
                        />
                            {/* <HashLoader color="#93c5fd" /> */}
                            {/* <ScaleLoader color="#93c5fd" radius={7} speedMultiplier={2}/> */}
                            
                        </Dialog.Panel> 
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
     );
}
 
export default LoadingModal;