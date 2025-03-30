"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupSchema } from "@/lib/validation";
import ErrorText from "@/components/resusables/error-text";
import Logo from "@/components/resusables/logo";
import GoogleIcon from "@/components/icons/google-icon";
import { AnimatePresence } from "framer-motion";

// Assuming these components exist in your project

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Setup form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: unknown) => {
    console.log("Signup Data:", data);
    toast("Account created successfully!");
  };

  const handleGoogleSignup = async () => {
    try {
      // Implement Google signup logic here
      console.log("Signing up with Google");
      // Example: await signUpWithGoogle();
    } catch (error) {
      toast.error("Failed to sign up with Google");
    }
  };

  const handleGithubSignup = async () => {
    try {
      // Implement GitHub signup logic here
      console.log("Signing up with GitHub");
      // Example: await signUpWithGithub();
    } catch (error) {
      toast.error("Failed to sign up with GitHub");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 shadow-sm rounded-md">
      <div className="flex items-center justify-center mb-16">
        <Logo />
      </div>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-dark mb-2">
          Create account
        </h1>
        <p className="text-gray-medium">
          Let&apos;s get you started sharing your links!
        </p>
      </div>

      {/* Social Signup Buttons */}
      <div className="space-y-4 mb-6">
        <Button
          type="button"
          variant="outline"
          className="w-full border-gray-light hover:bg-gray-50 text-gray-dark"
          onClick={handleGoogleSignup}>
          <GoogleIcon />
          Continue with Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full border-gray-light hover:bg-gray-50 text-gray-dark"
          onClick={handleGithubSignup}>
          <Github className="w-5 h-5 mr-2" />
          Continue with GitHub
        </Button>
      </div>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-light"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-medium">or</span>
        </div>
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
          <ErrorText value={errors.email} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="create-password" className="text-gray-dark">
            Create password
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-medium" />
            </div>
            <Input
              id="create-password"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              className="pl-10 border-gray-light focus:border-purple-primary focus:ring-purple-primary"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-medium" />
              ) : (
                <Eye className="h-5 w-5 text-gray-medium" />
              )}
            </div>
          </div>

          <ErrorText value={errors.password}></ErrorText>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-gray-dark">
            Confirm password
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-medium" />
            </div>
            <Input
              id="confirm-password"
              {...register("confirmPassword")}
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              className="pl-10 border-gray-light focus:border-purple-primary focus:ring-purple-primary"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-medium" />
              ) : (
                <Eye className="h-5 w-5 text-gray-medium" />
              )}
            </div>
          </div>
          <ErrorText value={errors.confirmPassword} />
          {!errors.confirmPassword && (
            <p className="text-sm text-gray-medium mt-1">
              Password must contain at least 8 characters
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-purple-primary hover:bg-purple-primary/90 text-white">
          Create new account
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-medium">
          Already have an account?
          <Link href="/login" className="text-purple-primary font-medium ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
