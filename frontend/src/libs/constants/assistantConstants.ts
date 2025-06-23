import type { FormField } from "@/types/formTypes";
import type { Messages } from "@/types/userTypes";
import { v4 as uuidv4 } from "uuid";
import { BriefcaseBusiness, Scissors, ShieldCheck, Smile, SpellCheck, type LucideIcon } from "lucide-react";


export const sendEmailFields: FormField[] = [
    { name: "emailTo", label: "To", type: "text", placeholder: "Recipient email address" },
]

type QuickAction = {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    color?: string
};

const handleRefineMessage = async (refineMessage: (originalText: string, action: string, assistantId: string) => Promise<any>, originalText: string, action: string, addMessage: (msg: Messages) => void) => {

    const assistantId = uuidv4();

    const response = await refineMessage(originalText, action, assistantId);
    if (response?.data?.success) {
        addMessage({
            id: assistantId,
            role: "assistant",
            content: response.data.geminiText,
        });
    } else {
        addMessage({
            id: uuidv4(),
            role: "assistant",
            content: "❌ Something went wrong. Please try again.",
        });
    }
}

export const getQuickActions = (
    originalText: string,
    addMessage: (msg: Messages) => void,
    refineMessage: (originalText: string, action: string, assistantId: string) => Promise<any>
): QuickAction[] => [
        {
            label: "Formal",
            icon: BriefcaseBusiness,
            color: "#05ceec",
            onClick: () => handleRefineMessage(refineMessage, originalText, "make it more formal", addMessage),
        },
        {
            label: "Casual",
            icon: Smile,
            color: "#ecb505",
            onClick: () => handleRefineMessage(refineMessage, originalText, "make it more casual", addMessage),
        },
        {
            label: "Confident",
            icon: ShieldCheck,
            color: "#FF6B00",
            onClick: () => handleRefineMessage(refineMessage, originalText, "make it more confident", addMessage),
        },
        {
            label: "Fix Grammar",
            icon: SpellCheck,
            color: "#05ec13",
            onClick: () => handleRefineMessage(refineMessage, originalText, "fix grammar", addMessage),
        },
        {
            label: "Shorten",
            icon: Scissors,
            color: "#ff272c",
            onClick: () => handleRefineMessage(refineMessage, originalText, "shorten the message", addMessage),
        },
    ];
