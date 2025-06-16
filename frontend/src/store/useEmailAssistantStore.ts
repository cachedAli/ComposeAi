import { useFetch } from "@/hooks/useFetch";
import { supabase } from "@/libs/supabaseClient";
import type { Messages } from "@/types/userTypes";
import { create } from "zustand";


type AssistantState = {
    loading: boolean;
    setLoading: (value: boolean) => void;
    assistantLoading: boolean;
    setAssistantLoading: (value: boolean) => void;

    file: File | null;
    setFile: (value: File | null) => void;
    messages: Messages[];
    addMessage: (msg: Messages) => void;
    editMessage: (id: string, updatedContent: string) => void;
    sendToBackend: (msg: Messages, history: Messages[]) => Promise<any>

    isSendEmail: boolean;
    setSendEmail: (value: boolean) => void;
    isLogout: boolean;
    setLogout: (value: boolean) => void;
}

export const useEmailAssistantStore = create<AssistantState>((set) => ({
    loading: true,
    setLoading: (value) => set({ loading: value }),
    assistantLoading: false,
    setAssistantLoading: (value) => set({ assistantLoading: value }),

    file: null,
    setFile: (value) => set({ file: value }),

    messages: [],
    addMessage: (msg) => {
        set((state) => ({
            messages: [...state.messages, msg],
        }));
    },

    sendToBackend: async (msg: Messages, history: Messages[]) => {
        const { data } = await supabase.auth.getUser();
        const userId = data?.user?.id ?? null;
        useEmailAssistantStore.getState().setAssistantLoading(true)
        try {
            const response = await useFetch("post", "/message", {
                prompt: msg.content,
                file: msg.file ?? null,
                history,
                userId: userId
            });
            useEmailAssistantStore.getState().setAssistantLoading(false)
            return response;
        } catch (err) {
            useEmailAssistantStore.getState().setAssistantLoading(false)
            console.error(err);
            return null;
        }
    },

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