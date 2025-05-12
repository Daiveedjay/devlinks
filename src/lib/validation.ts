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

export const platformPatterns: Record<string, RegExp> = {
  github: /^https?:\/\/(www\.)?github\.com\/[\w-]+\/?$/,
  twitter: /^https?:\/\/(www\.)?(x|twitter)\.com\/[\w-]+\/?(?:\?.*)?$/,

  linkedin: /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[\w-]+\/?$/,
  facebook:
    /^https?:\/\/(www\.|web\.)?facebook\.com\/(profile\.php\?id=\d+|[\w.-]+)\/?$/,
  youtube:
    /^https?:\/\/(www\.)?(youtube\.com\/(@[\w-]+|c\/[\w-]+|channel\/[\w-]+|user\/[\w-]+|watch\?v=[\w-]+)|youtu\.be\/[\w-]+)\/?$/,
  dribbble: /^https?:\/\/(www\.)?dribbble\.com\/[\w-]+\/?$/,
  twitch: /^https?:\/\/(www\.)?twitch\.tv\/[\w-]+\/?$/,
  devto: /^https?:\/\/(www\.)?dev\.to\/[\w-]+\/?$/,
  framer: /^https?:\/\/(www\.)?framer\.com\/@[\w-]+\/?$/,
  spotify: /^https?:\/\/(open\.)?spotify\.com\/user\/[\w-]+\/?$/,
  soundcloud:
    /^https?:\/\/(soundcloud\.com\/[\w-]+(?:\/[\w-]+)?|on\.soundcloud\.com\/[\w]+)\/?$/,
  producthunt: /^https?:\/\/(www\.)?producthunt\.com\/@[\w-]+\/?$/,
  stackoverflow:
    /^https?:\/\/(www\.)?stackoverflow\.com\/users\/\d+\/[\w-]+\/?$/,
  behance: /^https?:\/\/(www\.)?behance\.net\/[\w-]+\/?$/,
  hashnode: /^https?:\/\/(www\.)?hashnode\.com\/@[\w-]+\/?$/,
  instagram: /^https?:\/\/(www\.)?instagram\.com\/[\w.-]+\/?$/,
  codepen: /^https?:\/\/(www\.)?codepen\.io\/[\w-]+\/?$/,

  other:
    /^(?:(?:https?:\/\/)?(?:www\.)?|(?:www\.)?)[\w-]+\.[a-zA-Z]{2,}(\S+)?$/,
};

// 2. Dynamic platform keys
export const platformKeys = platforms.map((p) => p.value) as [
  string,
  ...string[]
];

// 4. Zod validation schema
export const socialMediaSchema = z
  .object({
    Platform: z.enum(platformKeys),
    URL: z
      .string()
      .url("Invalid URL format")
      .regex(/^https?:\/\//, "Link must start with http:// or https://"),
  })
  .refine(
    (data) => {
      const regex = platformPatterns[data.Platform];
      return !regex || regex.test(data.URL);
    },
    {
      message: "The URL does not match the selected platform.",
      path: ["URL"],
    }
  );
