import { Drama, Globe, MessageCircleHeart, NotebookPen, Paperclip, Pencil } from "lucide-react"
import { ImUserTie } from "react-icons/im";
import { PiShieldCheckeredFill } from "react-icons/pi";
import { SiRobotframework } from "react-icons/si";

export const features = [
    {
        title: "Smart Drafting",
        description: "Compose emails quickly using AI powered suggestions, saving time and reducing writer’s block.",
        icon: Pencil
    },

    {
        title: "Personalized Email Drafts",
        description: "ComposeAI generates drafts tailored to your tone and preferences.",
        icon: Drama
    },

    {
        title: "Grammar & Spell Check",
        description: "Automatically corrects spelling, grammar, and punctuation errors.",
        icon: NotebookPen
    },

    {
        title: "Quick Insert",
        description: "Auto-inserts attachments, or images based on your draft.",
        icon: Paperclip
    },
    {
        title: "Shorten Emails",
        description: "Instantly make your emails more concise with one click.",
        icon: Globe
    },
    {
        title: "Adjust Tone & Style",
        description: "Instantly rewrite drafts to sound more professional, friendly, or assertive with one click.",
        icon: MessageCircleHeart
    },
]

export const howItWorks = [
    {
        title: "Create Account",
        description: "Quickly create your account to access ComposeAI’s smart email features.",
        icon: ImUserTie,
    },
    {
        title: "Connect Email",
        description: "Securely link your Gmail with Google Sign-In via OAuth2.",
        icon: PiShieldCheckeredFill,
    },
    {
        title: "Generate Emails",
        description: "Draft, personalize, and send your AI-crafted emails effortlessly.",
        icon: SiRobotframework,
    },
];
