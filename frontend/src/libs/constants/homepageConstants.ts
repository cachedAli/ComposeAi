import { Bot, Drama, Globe, MessageCircleHeart, NotebookPen, Paperclip, Pencil, Shield, User } from "lucide-react"

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
        description: "Auto-inserts relevant links, attachments, or images based on your draft.",
        icon: Paperclip
    },
    {
        title: "Language Translation",
        description: "Draft emails in different languages with a single click.",
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
        icon: User,
    },
    {
        title: "Connect Email",
        description: "Link your email safely using OAuth2 for seamless AI-powered drafting.",
        icon: Shield,
    },
    {
        title: "Generate Emails",
        description: "Review, customize, and send your AI-crafted emails effortlessly.",
        icon: Bot,
    },
];
