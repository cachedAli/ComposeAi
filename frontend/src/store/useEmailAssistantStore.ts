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

   


    isSendEmail: false,
    isLogout: false,
    setSendEmail: (value) => set({ isSendEmail: value }),
    setLogout: (value) => set({ isLogout: value }),


}))