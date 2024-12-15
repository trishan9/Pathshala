import z from "zod";

export const loginFormSchema = z.object({
  userName: z
    .string()
    .min(1, "Username can't be empty.")
    .min(3, "Username can't be less than 3 characters."),
  password: z
    .string()
    .min(1, "Password can't be empty.")
    .min(8, "Password can't be less than 8 characters."),
});

export const signupFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "Name can't be empty.")
    .min(7, "Name can't be less than 7 characters."),
  userName: z
    .string()
    .min(1, "Username can't be empty.")
    .min(3, "Username can't be less than 3 characters."),
  emailAddress: z
    .string()
    .min(1, "Email address can't be empty.")
    .email("Email address must be valid."),
  password: z
    .string()
    .min(1, "Password can't be empty.")
    .min(8, "Password can't be less than 8 characters."),
});
