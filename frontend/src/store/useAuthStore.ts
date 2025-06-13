import { supabase } from "@/libs/supabaseClient";
import { capitalizeFirstLetter, createUserObject } from "@/libs/utils";
import type { SigninData, SignupData } from "@/types/authTypes";
import { toast } from "sonner";
import { create } from "zustand";
import { useUserStore } from "./useUserStore";
import type { User } from "@/types/userTypes";

type AuthState = {
    signInWithGoogle: () => Promise<any>;
    signInWithGitHub: () => Promise<any>;
    signup: (userData: SignupData) => Promise<boolean>;
    signin: (userData: SigninData) => Promise<boolean>;
    logout: () => Promise<void>;
    forgotPassword: (userData: { email: string }) => Promise<boolean>;
    checkAuth: () => Promise<User | null>;
}

export const useAuthStore = create<AuthState>(() => ({

    signInWithGoogle: async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                }
            })

            if (error) {
                console.log(error);
                return;
            }

            return data
        } catch (err) {
            console.log(err)
        }
    },

    signInWithGitHub: async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "github",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                },
            })
            if (error) {
                toast.error(error.message)
                return;
            }

            return data;
        } catch (err) {
            console.log(err)

        }
    },

    signup: async (userData) => {
        const { firstName, lastName, email, password } = userData;

        try {

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        firstName,
                        lastName
                    }
                }
            })

            if (error) {
                if (error.message.includes("User already registered")) {
                    toast.error("Email is already registered. Please sign in instead.");
                } else {
                    toast.error(error.message);
                }
                return false;
            }

            toast.success(`Verification email sent to ${email}. Check your inbox!`);
            console.log(data)
            return true;

        } catch (err) {
            toast.error("Something went wrong during signup");
            console.log(err);
            return false;
        }
    },

    signin: async (userData) => {
        const { email, password } = userData;

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            const firstName = data?.user?.user_metadata?.firstName;
            const lastName = data?.user?.user_metadata?.lastName
            const fullName = `${firstName} ${lastName}`

            if (error) {
                toast.error(error.message);
                return false;
            }
            const newUser = createUserObject(data?.user);
            useUserStore.getState().setUser(newUser);
            toast.success(`Welcome back, ${capitalizeFirstLetter(fullName)}`)
            return true;
        } catch (error) {
            toast.error("Something went wrong during signin");
            console.log(error);
            return false;
        }
    },
    logout: async () => {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                toast.error(error.message)
                return;
            } else {

                useUserStore.getState().setUser(null);
                toast.success("Sign out successfully")
            }
        } catch (err) {
            toast.error("Something went wrong during signout.");
            console.error(err);
            return;
        }
    },

    forgotPassword: async (userData) => {
        const { email } = userData;

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`
            })

            if (error) {
                toast.error(error.message);
                return false;
            }

            toast.success(`Password reset email sent to ${email}. Check your inbox!`);
            return true;
        } catch (error) {
            toast.error("Something went wrong during reset password.");
            console.log(error);
            return false;
        }
    },
    checkAuth: async () => {
        const { data, error } = await supabase.auth.getUser();

        if (error || !data?.user) {
            useUserStore.getState().setUser(null);
            return null;
        }

        const newUser = createUserObject(data?.user);
        useUserStore.getState().setUser(newUser);
        return newUser;
    }
}))