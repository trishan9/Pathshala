import z from "zod";

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(1, "Username can't be empty.")
    .min(3, "Username can't be less than 3 characters."),
  password: z
    .string()
    .min(1, "Password can't be empty.")
    .min(8, "Password must be between 8 to 16 characters.")
    .max(16, "Password must be between 8 to 16 characters."),
});

export const signupFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name can't be empty.")
    .min(7, "Name can't be less than 7 characters."),
  username: z
    .string()
    .min(1, "Username can't be empty.")
    .min(3, "Username can't be less than 3 characters."),
  email: z
    .string()
    .min(1, "Email address can't be empty.")
    .email("Email address must be valid."),
  password: z
    .string()
    .min(1, "Password can't be empty.")
    .min(8, "Password must be between 8 to 16 characters.")
    .max(16, "Password must be between 8 to 16 characters."),
});
