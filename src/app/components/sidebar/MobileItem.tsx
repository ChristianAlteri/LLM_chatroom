'use client'

import Link from "next/link";
import clsx from "clsx";
import { on } from "events";

interface MobileItemProps {
    href: string;
    active?: boolean;
    icon: any;
    onClick?: () => void;

}

const MobileItem: React.FC<MobileItemProps> = ({
    href,
    active,
    icon: Icon,
    onClick
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    }


    return ( 
        <Link
        onClick={onClick}
        href={href}
        className={clsx(`
        group
        flex
        gap-x-3
        text-sm
        leading-6
        font-semibold
        w-full
        justify-center
        p-4
        text-slate-500 
        hover:text-slate-900
        hover:bg-slate-100
        `,
        active && 'bg-slate-100 text-slate-900'

        )}
        >
            <Icon className="h-7 w-7"/>  
        </Link>
     );
}
 
export default MobileItem