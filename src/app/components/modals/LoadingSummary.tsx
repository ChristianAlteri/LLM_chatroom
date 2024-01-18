'use client'

import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { HashLoader, ScaleLoader, ClimbingBoxLoader } from 'react-spinners'

import { quantum, helix } from 'ldrs'


// Default values shown


const LoadingSummary = () => {

    helix.register()
    return (
    <Transition.Root show as={Fragment}>

            <Dialog as='div' className='relative z-50' onClose={() => {}}>
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
                        {/* <l-quantum
                            size="45"
                            speed="3.5" 
                            color="rgb(80, 70, 99)" 
                        /> */}
                        <l-helix
                            size="35"
                            speed="2" 
                            color="rgb(80, 70, 99)" 
                        />

                            {/* <ClimbingBoxLoader color="rgba(131, 61, 0, 1)" speedMultiplier={0.5}/> */}
                            {/* <HashLoader color="#93c5fd" speedMultiplier={1}/> */}
                            {/* <ScaleLoader color="#93c5fd" radius={8} speedMultiplier={3}/> */}
                        </Dialog.Panel> 
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
     );
    }
 
export default LoadingSummary;