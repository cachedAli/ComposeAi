import type { FormField } from "@/types/formTypes";
import { BriefcaseBusiness, Scissors, ShieldCheck, Smile, SpellCheck, type LucideIcon } from "lucide-react";


export const sendEmailFields: FormField[] = [
    { name: "emailFrom", label: "From", type: "text", placeholder: "Your email address" },
    { name: "emailTo", label: "To", type: "text", placeholder: "Recipient email address" },
]

type QuickAction = {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    color?: string
};

export const quickActions: QuickAction[] = [
    {
        label: "Formal",
        icon: BriefcaseBusiness,
        onClick: () => console.log("Formal clicked"),
        color: "#05ceec"
    },
    {
        label: "Casual",
        icon: Smile,
        onClick: () => console.log("Casual clicked"),
        color: "#ecb505"
    },
    {
        label: "Confident",
        icon: ShieldCheck,
        onClick: () => console.log("Confident clicked"),
        color: "#FF6B00"
    },
    {
        label: "Fix Grammar",
        icon: SpellCheck,
        onClick: () => console.log("Fix Grammar clicked"),
        color: "#05ec13"
    },
    {
        label: "Shorten",
        icon: Scissors,
        onClick: () => console.log("Translate clicked"),
        color: "#ff272c"
    },
];
