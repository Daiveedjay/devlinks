"use client";

import ErrorText from "@/components/error-text";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Setup form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: unknown) => {
    console.log("Login Data:", data);
    toast.success("Event has been created.");
  };

  return (
    <div className="w-full max-w-md bg-white  p-8 shadow-sm rounded-md">
      <div className="flex items-center justify-center mb-16">
        <div className=" rounded-lg flex items-center justify-center">
          <Logo />
        </div>
      </div>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-dark mb-2">Login</h1>
        <p className="text-gray-medium">
          Add your details below to get back into the app
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-dark">
            Email address
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-medium" />
            </div>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="e.g. alex@email.com"
              className="pl-10 border-gray-light focus:border-purple-primary focus:ring-purple-primary"
            />
          </div>
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-dark">
            Password
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-medium" />
            </div>
            <Input
              id="password"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className=" pl-10 border-gray-light focus:border-purple-primary focus:ring-purple-primary"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeClosed className="h-5 w-5 text-gray-medium cursor-pointer" />
              ) : (
                <Eye className="h-5 w-5 text-gray-medium cursor-pointer" />
              )}
            </div>
          </div>

          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </div>

        <Button
          type="submit"
          className="w-full bg-purple-primary hover:bg-purple-primary/90 text-white">
          Login
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-medium">
          Don&apos;t have an account?
          <Link href="/signup" className="text-purple-primary font-medium ml-1">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
