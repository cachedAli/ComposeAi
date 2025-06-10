import type { ClassValue } from "clsx"
import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const capitalizeFirstLetter = (string: string) => {
    if (!string) return "";
    return string.toLowerCase().split(" ").map((word) => {

        if (!word) return "";
        return word[0].toUpperCase() + word.slice(1)
    }).join(" ")
}