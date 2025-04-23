"use client";

import ErrorText from "@/components/resusables/error-text";
import Spinner from "@/components/resusables/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { profileSchema } from "@/lib/validation";
import { useUpdateUser } from "@/queries/user/user";
import { User, useUserStore } from "@/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldAlert } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ProfileForm() {
  const [focusedField, setFocusedField] = useState<string | null>("firstName");

  // Setup form validation
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: "An adventurer who loves to explore new places.",
    },
  });

  const user = useUserStore((store) => store.user);

  const { mutate: updateUserAsync, isPending } = useUpdateUser();

  const onSubmit = (data: Partial<User>) => {
    console.log(data);

    updateUserAsync({ username: data.username, bio: data.bio });
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(" ")) {
      // toast.error("Username cannot contain spaces");

      toast("Username cannot contain spaces", {
        className: "error-toast ",
        // description: "With a description and an icon",
        duration: 2000,
        icon: <ShieldAlert />,
      });
      setValue("username", value.replace(/\s/g, ""), { shouldValidate: true });
      return;
    }
    setValue("username", value, { shouldValidate: true });
  };

  // const bio = watch("bio", user.bio); // Ensure we track the latest bio value

  // Watch both fields for changes
  const watchedUsername = watch("username", user.username);
  const watchedBio = watch("bio", user.bio);

  // Check if there are any changes
  const hasChanges = React.useMemo(() => {
    const usernameChanged = watchedUsername !== user.username;
    const bioChanged = watchedBio !== user.bio;
    return usernameChanged || bioChanged;
  }, [watchedUsername, watchedBio, user.username, user.bio]);

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 200) {
      // toast.error("Bio cannot exceed 200 characters");

      toast("Bio cannot exceed 200 characters", {
        className: "error-toast ",
        // description: "With a description and an icon",
        duration: 2000,
        icon: <ShieldAlert />,
      });
      setValue("bio", value.slice(0, 200), { shouldValidate: true });
      return;
    }
    setValue("bio", value, { shouldValidate: true });
  };

  return (
    <form
      className="w-full bg-gray-background dark:bg-sidebar rounded-lg p-4 sm:p-8  space-y-4 "
      onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1 flex-col gap-1 sm:flex-row flex">
        <Label
          htmlFor="username"
          className=" text-gray-medium font-normal flex-1/3">
          Username *
        </Label>
        <div className="w-full space-y-1 relative">
          {" "}
          <Input
            {...register("username")}
            id="username"
            placeholder={user.username}
            defaultValue={user.username}
            className={`border dark:border-muted-foreground placeholder:font-normal font-semibold flex-2/3 ${
              focusedField === "username"
                ? "focus:border-purple-primary focus:ring-purple-primary ring-1"
                : "border-gray-light"
            } rounded-sm px-3 py-2 focus:outline-none`}
            onFocus={() => setFocusedField("username")}
            onBlur={() => setFocusedField(null)}
            onChange={handleUsernameChange}
            autoFocus
          />
          <ErrorText value={errors.username} />
        </div>
      </div>

      <div className="space-y-2 flex-col gap-1 sm:flex-row relative flex mt-8 sm:mt-12">
        <Label htmlFor="bio" className=" text-gray-medium font-normal flex-1/3">
          Bio *
        </Label>
        <div className="w-full space-y-1 relative">
          <Textarea
            {...register("bio")}
            id="bio"
            defaultValue={watchedBio}
            onChange={handleBioChange}
            className={`border dark:border-muted-foreground resize-none placeholder:font-normal  font-semibold flex-2/3 ${
              focusedField === "bio"
                ? "focus:border-purple-primary focus:ring-purple-primary ring-1"
                : "border-gray-light"
            } rounded-sm px-3 py-2 focus:outline-none`}
            onFocus={() => setFocusedField("bio")}
            onBlur={() => setFocusedField(null)}
          />{" "}
          <ErrorText value={errors.bio} />
        </div>
        <div
          className={`absolute -top-1 translate-y-1/5  sm:-translate-y-full right-0 text-sm ${
            watchedBio.length >= 200 ? "text-red-error font-medium" : ""
          }`}>
          {watchedBio.length} / 200
        </div>
      </div>

      <div className="space-y-2 flex-col gap-1 sm:flex-row flex">
        <Label
          htmlFor="email"
          className=" text-gray-medium font-normal flex-1/3">
          Email
        </Label>
        <div className="w-full">
          {" "}
          <Input
            id="email"
            type="email"
            disabled
            value={user.email}
            className={`border flex-2/3 ${
              focusedField === "email"
                ? "focus:border-purple-primary focus:ring-purple-primary ring-1"
                : "border-gray-light"
            } rounded-md px-3 py-2 focus:outline-none`}
          />
        </div>
      </div>

      <div className=" border-t-2 p-6 flex mt-10 justify-end">
        <Button
          className="px-8 py-6"
          variant="default"
          disabled={
            Object.keys(errors).length > 0 || isPending || !hasChanges // Add this condition
          }>
          {isPending && <Spinner />} Save
        </Button>
      </div>
    </form>
  );
}
