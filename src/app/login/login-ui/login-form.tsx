"use client";

import GoogleIcon from "@/components/icons/google-icon";
import ErrorText from "@/components/resusables/error-text";
import Logo from "@/components/resusables/logo";
import Spinner from "@/components/resusables/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/lib/validation";
import { useLogin } from "@/queries/auth/login";
import { AuthPayload } from "@/queries/auth/types/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Github, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

// const googleLogin = async () => {
//   // Call the backend endpoint for Google login.
//   // We set redirect: 'manual' so we can get the redirect URL from the response.
//   const response = await fetch(`${apiEndpoint}/auth/google/login`, {
//     method: "POST",
//     redirect: "manual", // tell fetch not to follow redirects automatically
//   });

//   // Your server is expected to respond with an HTTP 307 status and a 'Location' header.
//   if (response.status === 307) {
//     const redirectUrl = response.headers.get("Location");
//     if (redirectUrl) {
//       // Direct the browser to the Google OAuth URL
//       window.location.href = redirectUrl;
//       return; // Stop further processing if redirecting
//     }
//   }

//   // If the redirect didn't occur, throw an error to be handled by the mutation
//   throw new Error("Google login failed. No redirect URL found.");
// };

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate: login, isPending } = useLogin();

  // const { mutate } = useGoogleAuthCallback();

  // useEffect(() => {
  //   // When the component mounts, trigger the mutation to handle authentication
  //   mutate();
  // }, [mutate]);

  // Setup form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: AuthPayload) => {
    console.log("Login Data:", data);
    login({ email: data.email, password: data.password });
  };

  // const { mutate, isLoading, error } = useMutation({
  //   mutationFn: googleLogin,
  // });

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  };
  // const handleGoogleLogin = async () => {
  //   try {
  //     // Implement Google login logic here
  //     console.log("Logging in with Google");
  //     // Example: await signInWithGoogle();
  //   } catch (error) {
  //     toast.error("Failed to login with Google");
  //   }
  // };

  const handleGithubLogin = async () => {
    try {
      // Implement GitHub login logic here
      console.log("Logging in with GitHub");
      // Example: await signInWithGithub();
    } catch (error) {
      toast.error("Failed to login with GitHub");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 shadow-sm rounded-md">
      <div className="flex items-center justify-center mb-16">
        <div className="rounded-lg flex items-center justify-center">
          <Logo />
        </div>
      </div>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-dark mb-2">Login</h1>
        <p className="text-gray-medium">
          Add your details below to get back into the app
        </p>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-4 mb-6">
        <Button
          type="button"
          variant="outline"
          className="w-full border-gray-light hover:bg-gray-50 text-gray-dark"
          onClick={handleGoogleLogin}>
          <GoogleIcon />
          Continue with Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full border-gray-light hover:bg-gray-50 text-gray-dark"
          onClick={handleGithubLogin}>
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
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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

          <ErrorText value={errors.password} />
        </div>

        <Button
          // type="submit"
          disabled={!!errors.email || !!errors.password || isPending}
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-purple-primary hover:bg-purple-primary/90 text-white">
          {isPending ? <Spinner /> : "Login"}
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
