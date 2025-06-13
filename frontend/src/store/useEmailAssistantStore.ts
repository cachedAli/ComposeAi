import type { Messages } from "@/types/userTypes";
import { create } from "zustand";


type AssistantState = {
    loading: boolean;
    setLoading: (value: boolean) => void;

    file: File | null;
    setFile: (value: File | null) => void;
    messages: Messages[];
    addMessage: (msg: Omit<Messages, 'id'>) => void;
    editMessage: (id: string, upadtedContent: string) => void;

    isSendEmail: boolean;
    setSendEmail: (value: boolean) => void;
    isLogout: boolean;
    setLogout: (value: boolean) => void;
}

export const useEmailAssistantStore = create<AssistantState>((set) => ({
    loading: true,
    setLoading: (value) => set({ loading: value }),

    file: null,
    setFile: (value) => set({ file: value }),

    messages: [],
    addMessage: (msg) =>
        set((state) => ({
            messages: [...state.messages, { id: Date.now().toLocaleString(), ...msg }],
        })),
    editMessage: (id, updatedMessage) => set((state) => ({
        messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, content: updatedMessage } : msg
        )
    })),

    isSendEmail: false,
    isLogout: false,
    setSendEmail: (value) => set({ isSendEmail: value }),
    setLogout: (value) => set({ isLogout: value }),

}))