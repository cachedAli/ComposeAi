export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePic: string | undefined;
}

export type Messages = {
    userId?: string;
    id: string;
    role: "user" | "assistant";
    content: string;
    file?: File | null;
}

export type FileType = {
    name: string;
    type: string;
    size: string;
    path: string | null;
}