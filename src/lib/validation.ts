import { z } from "zod";
import { platforms } from "./constants";

// Login Form Schema
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

// Signup Form Schema
export const signupSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  bio: z.string().min(1, { message: "Bio is required" }),
});

// Create regex patterns dynamically for validation
const platformRegexMap: Record<string, RegExp> = Object.fromEntries(
  platforms.map(({ value, placeholder }) => {
    const regexPattern = `^${placeholder.replace(
      /username|channelname/,
      "[a-zA-Z0-9_-]+"
    )}$`.replace(/\./g, "\\."); // Escape dots in domain

    return [value, new RegExp(regexPattern)];
  })
);

const platformPatterns = {
  github: /^https?:\/\/(www\.)?github\.com\/[\w-]+\/?$/,
  twitter: /^https?:\/\/(www\.)?x\.com\/[\w-]+\/?$/,
  linkedin: /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[\w-]+\/?$/,
  facebook: /^https?:\/\/(www\.)?facebook\.com\/[\w-]+\/?$/,
  youtube:
    /^https?:\/\/(www\.)?(youtube\.com\/(@[\w-]+|c\/[\w-]+|channel\/[\w-]+|user\/[\w-]+|watch\?v=[\w-]+)|youtu\.be\/[\w-]+)\/?$/,

  dribbble: /^https?:\/\/(www\.)?dribbble\.com\/[\w-]+\/?$/,
  twitch: /^https?:\/\/(www\.)?twitch\.tv\/[\w-]+\/?$/,
  devto: /^https?:\/\/(www\.)?dev\.to\/[\w-]+\/?$/,
  website: /^https?:\/\/(www\.)?[\w-]+\.[a-zA-Z]{2,}.*$/, // General website rule
  framer: /^https?:\/\/(www\.)?framer\.com\/[\w-]+\/?$/,
};

export const socialMediaSchema = z
  .object({
    platform: z.string().nonempty("Platform is required"),
    url: z
      .string()
      .url("Invalid URL format")
      .regex(/^https?:\/\//, "Link must start with http:// or https://"),
  })
  .refine(
    (data) => {
      const regex = platformPatterns[data.platform];
      return !regex || regex.test(data.url);
    },
    {
      message: "The URL does not match the selected platform.",
      path: ["url"],
    }
  );
