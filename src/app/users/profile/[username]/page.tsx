import { apiEndpoint } from "@/lib/constants";
import PreviewTemplate from "@/components/preview/preview-template";
import { Link as LinkType } from "@/store/useLinkStore";
import NotFound from "./not-found";
import { Metadata } from "next";

export type UserProfileResponse = {
  id: number;
  username: string;
  email: string;
  bio: string;
  user_image: string;
  links: LinkType[];
};

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const response = await fetch(`${apiEndpoint}/users/profile/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return <NotFound />;
  }

  const data = await response.json();
  const userData: UserProfileResponse = data.data;

  return <PreviewTemplate user={{ ...userData, id: userData.id.toString() }} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;

  try {
    const response = await fetch(`${apiEndpoint}/users/profile/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        title: "User Not Found | DevLinks",
        description: "The requested user profile could not be found.",
      };
    }

    const { data: userData } = await response.json();

    return {
      title: `${userData.username}'s Links | DevLinks`,
      description:
        userData.bio || `Check out ${userData.username}'s profile on DevLinks`,
      openGraph: {
        title: `${userData.username}'s Links | DevLinks`,
        description:
          userData.bio ||
          `Check out ${userData.username}'s profile on DevLinks`,
        images: userData.user_image ? [userData.user_image] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${userData.username}'s Links | DevLinks`,
        description:
          userData.bio ||
          `Check out ${userData.username}'s profile on DevLinks`,
        images: userData.user_image ? [userData.user_image] : [],
      },
    };
  } catch {
    return {
      title: "Error | DevLinks",
      description: "An error occurred while loading the user profile.",
    };
  }
}
