'use client'

import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
    label: string;
    href: string;
    icon: any;
    onClick?: () => void;
    active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
    label,
    href,
    icon: Icon,
    onClick,
    active
}) => {

    const handleClick = () => {
        if (onClick) {
           return onClick();
        }
    };

    return ( 
        <li onClick={handleClick}>
            <Link
                href={href}
                className={clsx(`
                group
                
                flex
                gap-x-3
                rounded-md
                p-3
                text-sm
                leading-6
                font-semibold
                text-slate-400
                hover:text-black
                hover:bg-blue-200
                hover:border
                hover:border-slate-500
                `, 
                    active && `bg-blue-200 text-black`
                )}
            >
                <Icon className="h-6 w-6 shrink-0" />
                <span className="sr-only">{label}</span>
            </Link> 
        </li>
     );
}
 
export default DesktopItem;