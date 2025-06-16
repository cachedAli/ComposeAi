export type Messages = {
    userId?: string;
    id: string;
    role: "user" | "assistant";
    content: string;
    file?: File | null;
}