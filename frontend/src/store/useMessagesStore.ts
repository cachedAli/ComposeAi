import { create } from "zustand";

import { useEmailAssistantStore } from "./useEmailAssistantStore";
import type { Messages } from "@/types/userTypes";
import { supabase } from "@/libs/supabaseClient";
import { useFetch } from "@/hooks/useFetch";


type MessagesState = {

    messages: Messages[];
    setMessages: (value: Messages[]) => void;
    addMessage: (msg: Messages) => void;
    editMessage: (id: string, updatedContent: string) => void;
    sendToBackend: (msg: Messages, history: Messages[]) => Promise<any>
    sendEditMessageToBackend: (messageId: string, newPrompt: string, history: Messages[]) => Promise<any>
    fetchMessages: () => Promise<void>;

}

export const useMessagesStore = create<MessagesState>((set) => ({

    messages: [],
    setMessages: (value) => set({ messages: value }),
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
            const formData = new FormData();
            formData.append("prompt", msg.content),
                formData.append("userId", userId ?? ""),
                formData.append("id", msg.id),
                formData.append("history", JSON.stringify(history));

            if (msg.file) {
                formData.append("file", msg.file);
            }

            const response = await useFetch("post", "/message", formData, undefined, {
                headers: {
                    "Content-Type": undefined
                }
            });

            useEmailAssistantStore.getState().setAssistantLoading(false)
            return response;
        } catch (err) {
            useEmailAssistantStore.getState().setAssistantLoading(false)
            console.error(err);
            return null;
        }
    },

    sendEditMessageToBackend: async (messageId: string, newPrompt: string, history: Messages[]) => {
        const { data } = await supabase.auth.getUser();
        const userId = data?.user?.id ?? null;
        useEmailAssistantStore.getState().setAssistantLoading(true)

        try {

            const response = await useFetch("put", "/edit-message", { messageId, newPrompt, history, userId });

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


    fetchMessages: async () => {
        const { data: { user } } = await supabase.auth.getUser()

        const { data, error } = await supabase
            .from("messages")
            .select("*")
            .eq("user_id", user?.id)
            .order("created_at", { ascending: true, });

        console.log(data)

        if (!error && data) {
            const messagesWithFiles = data.map((msg) => {
                const file = msg.file_path
                    ? {
                        name: msg.file_name,
                        type: msg.file_type,
                        size: msg.file_size,
                        path: msg.file_path,
                        url: supabase.storage
                            .from("message-files")
                            .getPublicUrl(msg.file_path).data.publicUrl,
                    }
                    : null;

                return {
                    ...msg,
                    file,
                };
            });

            useMessagesStore.getState().setMessages(messagesWithFiles);
        } else {
            console.error("Error fetching readings:", error);
        }
    },


}))