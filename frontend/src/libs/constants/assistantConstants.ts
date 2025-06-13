import type { FormField } from "@/types/formTypes";
import { Languages, Smile, SpellCheck, Wand2, type LucideIcon } from "lucide-react";


export const sendEmailFields: FormField[] = [
    { name: "emailFrom", label: "From", type: "text", placeholder: "Your email address" },
    { name: "emailTo", label: "To", type: "text", placeholder: "Recipient email address" },
]

type QuickAction = {
    label: string;
    icon: LucideIcon; // Store the component, not JSX
    onClick: () => void;
};

export const quickActions: QuickAction[] = [
    {
        label: "Formal",
        icon: Wand2,
        onClick: () => console.log("Formal clicked"),
    },
    {
        label: "Casual",
        icon: Smile,
        onClick: () => console.log("Casual clicked"),
    },
    {
        label: "Fix Grammar",
        icon: SpellCheck,
        onClick: () => console.log("Fix Grammar clicked"),
    },
    {
        label: "Translate",
        icon: Languages,
        onClick: () => console.log("Translate clicked"),
    },
];