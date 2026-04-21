import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export const randomColors = () => {

    const number  = Math.floor((Math.random()*16777215));

    const toString = number.toString(16).padStart(6,'0');

    return `${toString}`;
}