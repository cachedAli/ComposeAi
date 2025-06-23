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

export const createUserObject = (user: any) => {
    if (!user) {
        throw new Error("user object is required");
    }

    const meta = user.user_metadata || {};
    const provider = user.app_metadata.provider ?? "email"
    const fullName = meta.full_name || "";
    const [firstName, ...lastParts] = fullName.split(" ");
    const lastName = lastParts.join(" ");

    return {
        id: user?.id,
        firstName: firstName || meta.firstName,
        lastName: lastName || meta.lastName,
        email: user.email ?? "",
        profilePic: meta.avatar_url ?? undefined,
        provider: provider
    }
}

