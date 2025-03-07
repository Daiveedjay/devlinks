"use client";

import ErrorText from "@/components/error-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { profileSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function ProfileForm() {
  const [focusedField, setFocusedField] = useState<string | null>("firstName");

  // Setup form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };
  return (
    <form
      className="w-full bg-gray-background p-8  space-y-4 "
      onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1 flex">
        <Label
          htmlFor="firstName"
          className=" text-gray-medium font-normal flex-1/3">
          First name *
        </Label>
        <div className="w-full space-y-1">
          {" "}
          <Input
            {...register("firstName")}
            id="firstName"
            defaultValue="Ben"
            className={`border flex-2/3 ${
              focusedField === "firstName"
                ? "focus:border-purple-primary focus:ring-purple-primary ring-1"
                : "border-gray-light"
            } rounded-md px-3 py-2 focus:outline-none`}
            onFocus={() => setFocusedField("firstName")}
            onBlur={() => setFocusedField(null)}
            autoFocus
          />
          {errors.firstName && (
            <ErrorText>{errors.firstName.message}</ErrorText>
          )}
        </div>
      </div>

      <div className="space-y-2 flex">
        <Label
          htmlFor="lastName"
          className=" text-gray-medium font-normal flex-1/3">
          Last name *
        </Label>
        <div className="w-full space-y-1">
          <Input
            {...register("lastName")}
            id="lastName"
            defaultValue="Wright"
            className={`border flex-2/3 ${
              focusedField === "lastName"
                ? "focus:border-purple-primary focus:ring-purple-primary ring-1"
                : "border-gray-light"
            } rounded-md px-3 py-2 focus:outline-none`}
            onFocus={() => setFocusedField("lastName")}
            onBlur={() => setFocusedField(null)}
          />{" "}
          {errors.lastName && <ErrorText>{errors.lastName.message}</ErrorText>}
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

      <div>
        <Button>Save</Button>
      </div>
    </form>
  );
}
