import { apiEndpoint } from "@/lib/constants";

import PreviewTemplate from "@/components/resusables/preview-template";
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
  params: { username: string };
}) {
  // Await the params to ensure they've been resolved
  const resolvedParams = await Promise.resolve(params);
  const { username } = resolvedParams;

  const response = await fetch(`${apiEndpoint}/users/profile/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Optionally, handle errors or parse JSON here
  console.log(response, "data in profile page");

  if (!response.ok) {
    console.log(response, "response in profile page");

    return <NotFound />;
  }

  const data = await response.json();

  const userData: UserProfileResponse = data.data;
  console.log(data, "data in profile page");

  return <PreviewTemplate user={{ ...userData, id: userData.id.toString() }} />;
}

// ...existing UserProfileResponse type..
// Add metadata generation function
export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const { username } = resolvedParams;

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      title: "Error | DevLinks",
      description: "An error occurred while loading the user profile.",
    };
  }
}
