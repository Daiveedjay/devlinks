import {
  Code2,
  Dribbble,
  Facebook,
  Framer,
  Github,
  Globe,
  Linkedin,
  Twitch,
  Twitter,
  Youtube,
} from "lucide-react";

export const platforms = [
  {
    value: "github",
    label: "GitHub",
    icon: Github,
    placeholder: "https://github.com/username",
    domainAvatar: "avatars.githubusercontent.com",
  },
  {
    value: "twitter",
    label: "Twitter",
    icon: Twitter,
    placeholder: "https://twitter.com/username",
    domainAvatar: "abs.twimg.com",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    placeholder: "https://linkedin.com/in/username",
    domainAvatar: "static.licdn.com",
  },
  {
    value: "facebook",
    label: "Facebook",
    icon: Facebook,
    placeholder: "https://facebook.com/username",
    domainAvatar: "static.xx.fbcdn.net",
  },
  {
    value: "youtube",
    label: "YouTube",
    icon: Youtube,
    placeholder: "https://youtube.com/c/channelname",
    domainAvatar: "yt3.googleusercontent.com",
  },
  {
    value: "dribbble",
    label: "Dribbble Portfolio",
    icon: Dribbble,
    placeholder: "https://dribbble.com/username",
    domainAvatar: "cdn.dribbble.com",
  },
  {
    value: "twitch",
    label: "Twitch",
    icon: Twitch,
    placeholder: "https://twitch.tv/username",
    domainAvatar: "static-cdn.jtvnw.net",
  },
  {
    value: "devto",
    label: "Dev.to",
    icon: Code2,
    placeholder: "https://dev.to/username",
    domainAvatar: "dev-to-uploads.s3.amazonaws.com",
  },
  {
    value: "website",
    label: "Personal Website",
    icon: Globe,
    placeholder: "https://yoursite.com",
  },

  {
    value: "framer",
    label: "Framer Portfolio",
    icon: Framer,
    placeholder: "https://framer.com/username",
    domainAvatar: "marketplace.framer.com",
  },
];

// const allowedDomainPlatforms
