import { create } from "zustand";


type AssistantState = {
    loading: boolean;
    setLoading: (value: boolean) => void;
    assistantLoading: boolean;
    setAssistantLoading: (value: boolean) => void;
    sendEmailLoading: boolean;
    setSendEmailLoading: (value: boolean) => void;


    file: File | null;
    setFile: (value: File | null) => void;
    html: string;
    setHtml: (value: string) => void;
    sendingEmailId: string | null;
    setSendingEmailId: (value: string) => void;

    isSendEmail: boolean;
    setSendEmail: (value: boolean) => void;
    isLogout: boolean;
    setLogout: (value: boolean) => void;
    showConnectGmail: boolean;
    setShowConnectGmail: (value: boolean) => void;

}

export const useEmailAssistantStore = create<AssistantState>((set) => ({
    loading: true,
    setLoading: (value) => set({ loading: value }),
    assistantLoading: false,
    setAssistantLoading: (value) => set({ assistantLoading: value }),
    sendEmailLoading: false,
    setSendEmailLoading: (value) => set({ sendEmailLoading: value }),

    file: null,
    setFile: (value) => set({ file: value }),
    html: "",
    setHtml: (value: string) => set({ html: value }),
    sendingEmailId: null,
    setSendingEmailId: (value: string) => set({ sendingEmailId: value }),

    isSendEmail: false,
    isLogout: false,
    setSendEmail: (value) => set({ isSendEmail: value }),
    setLogout: (value) => set({ isLogout: value }),
    showConnectGmail: false,
    setShowConnectGmail: (value) => set({ showConnectGmail: value }),


}))