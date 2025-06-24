# ComposeAI

ComposeAI is a web-based AI email assistant that helps users write emails faster, smarter, and with better tone. It integrates with Gmail using OAuth2 and the Gmail API, enabling users to generate, edit, and send emails directly with Gemini-powered suggestions.

## 🚀 Features

- ✍️ AI-powered email drafting using Gemini API
- 🔄 One-click tone and style rewriting (friendly, professional, assertive)
- ✂️ Smart email shortening and grammar correction
- 📎 Auto-inserts attachments based on context
- 🔐 Secure Google Sign-In via OAuth2 (gmail.send scope)
- 🧪 Preview mode available without sign-up

## 🛠️ Tech Stack

**Frontend:**  
React.js, TypeScript, Tailwind CSS, Zustand, Zod, React Hook Form, Framer Motion

**Backend / Infra:**  
Node.js, Supabase, PostgreSQL, Gmail API, OAuth2

**AI Integration:**  
Gemini API (for content generation, tone adjustment, and rewriting)

## 📸 Preview

![ComposeAI Screenshot](https://github.com/user-attachments/assets/8f1691ca-33b7-4372-a7e6-eb1362e3fcbb)

## 📦 Getting Started

To run this project locally:

```bash
git clone https://github.com/cachedAli/ComposeAi.git
cd ComposeAi
npm install
npm run dev
