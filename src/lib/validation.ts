import { z } from "zod";

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

const platformPatterns = {
  github: /^https?:\/\/(www\.)?github\.com\/[\w-]+\/?$/,
  twitter: /^https?:\/\/(www\.)?x\.com\/[\w-]+\/?$/,
  linkedin: /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[\w-]+\/?$/,
  facebook:
    /^https?:\/\/(www\.|web\.)?facebook\.com\/(profile\.php\?id=\d+|[\w.-]+)\/?$/,

  youtube:
    /^https?:\/\/(www\.)?(youtube\.com\/(@[\w-]+|c\/[\w-]+|channel\/[\w-]+|user\/[\w-]+|watch\?v=[\w-]+)|youtu\.be\/[\w-]+)\/?$/,

  dribbble: /^https?:\/\/(www\.)?dribbble\.com\/[\w-]+\/?$/,
  twitch: /^https?:\/\/(www\.)?twitch\.tv\/[\w-]+\/?$/,
  devto: /^https?:\/\/(www\.)?dev\.to\/[\w-]+\/?$/,
  website:
    /^(?:(?:https?:\/\/)?(?:www\.)?|(?:www\.)?)[\w-]+\.[a-zA-Z]{2,}(\S+)?$/,
  framer: /^https?:\/\/(www\.)?framer\.com\/@[\w-]+\/?$/,
};

export const socialMediaSchema = z
  .object({
    Platform: z.enum([
      "github",
      "twitter",
      "linkedin",
      "facebook",
      "youtube",
      "dribbble",
      "twitch",
      "devto",
      "website",
      "framer",
    ]),
    URL: z
      .string()
      .url("Invalid URL format")
      .regex(/^https?:\/\//, "Link must start with http:// or https://"),
  })
  .refine(
    (data) => {
      //
      const regex = platformPatterns[data.Platform];
      return !regex || regex.test(data.URL);
    },
    {
      message: "The URL does not match the selected platform.",
      path: ["url"],
    }
  );
