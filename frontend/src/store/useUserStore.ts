import { create } from "zustand";

import { supabase } from "@/libs/supabaseClient";
import { createUserObject } from "@/libs/utils";
import type { User } from "@/types/userTypes"


type UserState = {
    user: User | null;
    setUser: (user: User | null) => void;
    fetchUser: () => Promise<void>;
    
    fetchUserLoading: boolean;
    setFetchUserLoading: (value: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    fetchUser: async () => {
        useUserStore.getState().setFetchUserLoading(true);
        const { data, error } = await supabase.auth.getUser();

        if (error || !data?.user) {
            set({ user: null });
            return;
        }

        const mappedUser = createUserObject(data?.user)

        set({ user: mappedUser });
        useUserStore.getState().setFetchUserLoading(false);
    },

    fetchUserLoading: false,
    setFetchUserLoading: (value) => set({ fetchUserLoading: value })
}))