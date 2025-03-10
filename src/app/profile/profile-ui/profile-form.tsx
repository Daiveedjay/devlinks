"use client";

import ErrorText from "@/components/resusables/error-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { profileSchema } from "@/lib/validation";
import { User, useUserStore } from "@/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
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

  const updateUser = useUserStore((store) => store.updateUser);

  const onSubmit = (data: Partial<User>) => {
    console.log(data);
    updateUser({ username: data.username, bio: data.bio });
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(" ")) {
      toast.error("Username cannot contain spaces");
      setValue("username", value.replace(/\s/g, ""), { shouldValidate: true });
      return;
    }
    setValue("username", value, { shouldValidate: true });
  };

  const bio = watch("bio", ""); // Ensure we track the latest bio value

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 200) {
      toast.error("Bio cannot exceed 200 characters");
      setValue("bio", value.slice(0, 200), { shouldValidate: true });
      return;
    }
    setValue("bio", value, { shouldValidate: true });
  };

  return (
    <form
      className="w-full bg-gray-background p-8  space-y-4 "
      onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1 flex">
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
            placeholder="Ben"
            className={`border placeholder:font-normal  font-semibold flex-2/3 ${
              focusedField === "username"
                ? "focus:border-purple-primary focus:ring-purple-primary ring-1"
                : "border-gray-light"
            } rounded-md px-3 py-2 focus:outline-none`}
            onFocus={() => setFocusedField("username")}
            onBlur={() => setFocusedField(null)}
            onChange={handleUsernameChange}
            autoFocus
          />
          {errors.username && (
            <div className=" absolute top-1/2 -translate-y-2/3 right-2">
              {" "}
              <ErrorText>{errors.username.message}</ErrorText>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 relative flex mt-12">
        <Label htmlFor="bio" className=" text-gray-medium font-normal flex-1/3">
          Bio *
        </Label>
        <div className="w-full space-y-1 relative">
          <Textarea
            {...register("bio")}
            id="bio"
            defaultValue={bio}
            onChange={handleBioChange}
            className={`border resize-none placeholder:font-normal  font-semibold flex-2/3 ${
              focusedField === "bio"
                ? "focus:border-purple-primary focus:ring-purple-primary ring-1"
                : "border-gray-light"
            } rounded-md px-3 py-2 focus:outline-none`}
            onFocus={() => setFocusedField("bio")}
            onBlur={() => setFocusedField(null)}
          />{" "}
          {errors.bio && (
            <div className=" absolute top-1/2 -translate-y-2/3 right-2">
              {" "}
              <ErrorText>{errors.bio.message}</ErrorText>
            </div>
          )}
        </div>
        <div
          className={`absolute -top-1 -translate-y-full right-0  text-sm ${
            bio.length >= 200 ? "text-red-error font-medium" : ""
          }`}>
          {bio.length} / 200
        </div>
      </div>

      <div className="space-y-2 flex">
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
            value="ben@example.com"
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
          disabled={Object.keys(errors).length > 0}>
          Save
        </Button>
      </div>
    </form>
  );
}
