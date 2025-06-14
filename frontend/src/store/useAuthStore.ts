import { supabase } from "@/libs/supabaseClient";
import { capitalizeFirstLetter, createUserObject } from "@/libs/utils";
import type { SigninData, SignupData } from "@/types/authTypes";
import { toast } from "sonner";
import { create } from "zustand";
import { useUserStore } from "./useUserStore";
import type { User } from "@/types/userTypes";

type AuthState = {
    // Actions
    signInWithGoogle: () => Promise<any>;
    signInWithGitHub: () => Promise<any>;
    signup: (userData: SignupData) => Promise<boolean>;
    signin: (userData: SigninData) => Promise<boolean>;
    logout: () => Promise<void>;
    forgotPassword: (userData: { email: string }) => Promise<boolean>;
    checkAuth: () => Promise<User | null>;

    // Loading states
    signupLoading: boolean;
    setSignupLoading: (value: boolean) => void;

    signinLoading: boolean;
    setSigninLoading: (value: boolean) => void;

    googleLoading: boolean;
    setGoogleLoading: (value: boolean) => void;

    githubLoading: boolean;
    setGithubLoading: (value: boolean) => void;

    forgotPasswordLoading: boolean;
    setForgotPasswordLoading: (value: boolean) => void;

    resetPasswordLoading: boolean;
    setResetPasswordLoading: (value: boolean) => void;

    logoutLoading: boolean;
    setLogoutLoading: (value: boolean) => void;

}

export const useAuthStore = create<AuthState>((set) => ({

    // Loading states
    signupLoading: false,
    setSignupLoading: (value) => set({ signupLoading: value }),

    signinLoading: false,
    setSigninLoading: (value) => set({ signinLoading: value }),

    googleLoading: false,
    setGoogleLoading: (value) => set({ googleLoading: value }),

    githubLoading: false,
    setGithubLoading: (value) => set({ githubLoading: value }),

    forgotPasswordLoading: false,
    setForgotPasswordLoading: (value) => set({ forgotPasswordLoading: value }),

    resetPasswordLoading: false,
    setResetPasswordLoading: (value) => set({ resetPasswordLoading: value }),

    logoutLoading: false,
    setLogoutLoading: (value) => set({ logoutLoading: value }),


    // Action states
    signInWithGoogle: async () => {
        useAuthStore.getState().setGoogleLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                }
            })

            if (error) {
                useAuthStore.getState().setGoogleLoading(false);
                console.log(error);
                return;
            }

            return data
        } catch (err) {
            useAuthStore.getState().setGoogleLoading(false);
            console.log(err)
        }
    },

    signInWithGitHub: async () => {
        useAuthStore.getState().setGithubLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "github",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                },
            })
            if (error) {
                useAuthStore.getState().setGithubLoading(false);
                toast.error(error.message)
                return;
            }

            return data;
        } catch (err) {
            useAuthStore.getState().setGithubLoading(false);
            console.log(err)

        }
    },

    signup: async (userData) => {
        const { firstName, lastName, email, password } = userData;

        useAuthStore.getState().setSignupLoading(true);

        try {
            const { error } = await supabase.auth.signUp({
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
                    useAuthStore.getState().setSignupLoading(false);
                } else {
                    toast.error(error.message);
                    useAuthStore.getState().setSignupLoading(false);
                }
                return false;
            }

            useAuthStore.getState().setSignupLoading(false);
            toast.success(`Verification email sent to ${email}. Check your inbox!`);
            return true;

        } catch (err) {
            toast.error("Something went wrong during signup");
            useAuthStore.getState().setSignupLoading(false);
            console.log(err);
            return false;
        }
    },

    signin: async (userData) => {
        const { email, password } = userData;

        useAuthStore.getState().setSigninLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            const metadata = data?.user?.user_metadata || {};
            const fullName =
                metadata.firstName || metadata.lastName
                    ? `${metadata.firstName ?? ""} ${metadata.lastName ?? ""}`.trim()
                    : metadata.full_name || "";


            if (error) {
                toast.error(error.message);
                useAuthStore.getState().setSigninLoading(false);
                return false;
            }
            const newUser = createUserObject(data?.user);
            useUserStore.getState().setUser(newUser);
            useAuthStore.getState().setSigninLoading(false);
            toast.success(`Welcome back, ${capitalizeFirstLetter(fullName)}`)
            return true;
        } catch (error) {
            useAuthStore.getState().setSigninLoading(false);
            toast.error("Something went wrong during signin");
            console.log(error);
            return false;
        }
    },
    logout: async () => {
        useAuthStore.getState().setLogoutLoading(true);
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                useAuthStore.getState().setLogoutLoading(false);
                toast.error(error.message)
                return;
            } else {

                useUserStore.getState().setUser(null);
                useAuthStore.getState().setLogoutLoading(false);
                toast.success("Sign out successfully")
            }
        } catch (err) {
            useAuthStore.getState().setLogoutLoading(false);
            toast.error("Something went wrong during signout.");
            console.error(err);
            return;
        }
    },

    forgotPassword: async (userData) => {
        const { email } = userData;
        useAuthStore.getState().setForgotPasswordLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`
            })

            if (error) {
                useAuthStore.getState().setForgotPasswordLoading(false);
                toast.error(error.message);
                return false;
            }

            useAuthStore.getState().setForgotPasswordLoading(false);
            toast.success(`Password reset email sent to ${email}. Check your inbox!`);
            return true;
        } catch (error) {
            useAuthStore.getState().setForgotPasswordLoading(false);
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