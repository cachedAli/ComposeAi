import type { FormField } from "@/types/formTypes";

export const signupFields: FormField[] = [
    { name: "firstName", label: "First name", type: "text", placeholder: "Your first name", colspan: 1, smColspan: true },
    { name: "lastName", label: "Last name", type: "text", placeholder: "Your last name", colspan: 1, smColspan: true },

    { name: "email", label: "Email", type: "text", placeholder: "Your email address" },
    { name: "password", label: "Password", type: "password", placeholder: "Enter password" },
]

export const signinFields: FormField[] = [
    { name: "email", label: "Email", type: "text", placeholder: "Your email address" },
    { name: "password", label: "Password", type: "password", placeholder: "Enter password" },
]

export const forgotPasswordFields: FormField[] = [
    { name: "email", label: "Email", type: "text", placeholder: "Your email address" },
]

export const resetPasswordFields: FormField[] = [
    { name: "password", label: "New password", type: "password", placeholder: "Create a password" },
    { name: "confirmPassword", label: "Confirm password", type: "password", placeholder: "Confirm password" },

]