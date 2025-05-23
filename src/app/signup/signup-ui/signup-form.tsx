"use client";

import GoogleIcon from "@/components/icons/google-icon";
import ErrorText from "@/components/resusables/error-text";
import Logo from "@/components/resusables/logo";
import Spinner from "@/components/resusables/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiEndpoint } from "@/lib/constants";
import { signupSchema } from "@/lib/validation";
import { useSignup } from "@/queries/auth/signup";
import { AuthPayload } from "@/queries/auth/types/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Github, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Assuming these components exist in your project

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isGoogleProcessing, setIsGoogleProcessing] = useState(false);
  const [isGithubProcessing, setIsGithubProcessing] = useState(false);
  const router = useRouter();

  const { mutate: signup, isPending } = useSignup();

  // Setup form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: AuthPayload & { confirmPassword: string }) => {
    signup({ email: data.email, password: data.password });
  };

  // const handleOAuth = (provider: string) => {
  //   setIsAuthProcessing(true);
  //   router.push(`${apiEndpoint}/auth/${provider}`);
  // };

  const handleGoogleAuth = () => {
    setIsGoogleProcessing(true);
    router.push(`${apiEndpoint}/auth/google`);
  };

  const handleGithubAuth = () => {
    setIsGithubProcessing(true);
    router.push(`${apiEndpoint}/auth/github`);
  };

  const isAnyProcessing = isGoogleProcessing || isGithubProcessing || isPending;

  return (
    <div className="w-full max-w-md bg-sidebar p-4 sm:p-8 shadow-sm rounded-md">
      <div className="flex items-center justify-center mb-16">
        <Logo />
      </div>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-dark mb-2">
          Create account
        </h1>
        <p className="text-gray-medium dark:text-foreground">
          Let&apos;s get you started sharing your links!
        </p>
      </div>

      {/* Social Signup Buttons */}
      <div className="space-y-4 mb-6">
        <Button
          type="button"
          variant="outline"
          disabled={isAnyProcessing}
          className="w-full border-gray-light bg-purple-light hover:text-background hover:bg-purple-secondary  dark:text-foreground dark:hover:bg-purple-primary"
          onClick={handleGoogleAuth}>
          {isGoogleProcessing ? <Spinner /> : <GoogleIcon />}
          Continue with Google
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={isAnyProcessing}
          className="w-full border-gray-light bg-purple-light hover:text-background hover:bg-purple-secondary  dark:text-foreground dark:hover:bg-purple-primary"
          onClick={handleGithubAuth}>
          {isGithubProcessing ? (
            <Spinner />
          ) : (
            <Github className="w-5 h-5 mr-2" />
          )}
          Continue with GitHub
        </Button>
      </div>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-light"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 rounded-sm bg-sidebar-border text-gray-medium">
            or
          </span>{" "}
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
              autoComplete="email"
              placeholder="e.g. alex@email.com"
              className="pl-10 border-gray-light dark:border-muted-foreground focus:border-purple-primary focus:ring-purple-primary"
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
              autoComplete="new-password"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              className="pl-10 border-gray-light dark:border-muted-foreground focus:border-purple-primary focus:ring-purple-primary"
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
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              className="pl-10 border-gray-light dark:border-muted-foreground focus:border-purple-primary focus:ring-purple-primary"
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
            <p className="text-sm text-gray-medium mt-1 dark:text-chart-5">
              Password must contain at least 8 characters
            </p>
          )}
        </div>

        <Button
          disabled={
            !!errors.email || !!errors.password || isPending || isAnyProcessing
          }
          onClick={handleSubmit(onSubmit)}
          className="w-full dark:bg-sidebar-primary bg-purple-primary  dark:text-foreground dark:hover:bg-purple-primary text-background">
          {isPending && <Spinner />} Create new account
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-medium dark:text-foreground">
          Already have an account?
          <Link href="/login" className="text-purple-primary font-medium ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
