import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertUserSchema, type InsertUser } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

// Create types for form data
type LoginFormData = {
  username: string;
  password: string;
};

type RegisterFormData = InsertUser;

// Create login schema separate from insert schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AuthPage() {
  const { translations } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [, setLocation] = useLocation();
  const { loginMutation, registerMutation, user } = useAuth();

  // Type-safe form handling with proper type narrowing
  const form = useForm({
    resolver: zodResolver(isLogin ? loginSchema : insertUserSchema),
    defaultValues: isLogin
      ? { username: "", password: "" }
      : { username: "", password: "", email: "", confirmPassword: "" },
  });

  if (user) {
    setLocation("/");
    return null;
  }

  const onSubmit = form.handleSubmit((data) => {
    if (isLogin) {
      loginMutation.mutate(data as LoginFormData, {
        onSuccess: () => setLocation("/"),
      });
    } else {
      registerMutation.mutate(data as RegisterFormData, {
        onSuccess: () => setLocation("/"),
      });
    }
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">
                {isLogin ? translations?.login : translations?.register}
              </h1>
              <p className="text-muted-foreground">
                {isLogin
                  ? translations?.loginDescription
                  : translations?.registerDescription}
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">{translations?.username}</Label>
                <Input
                  id="username"
                  type="text"
                  {...form.register("username")}
                  error={form.formState.errors.username?.message}
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="email">{translations?.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    error={form.formState.errors.email?.message}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">{translations?.password}</Label>
                <Input
                  id="password"
                  type="password"
                  {...form.register("password")}
                  error={form.formState.errors.password?.message}
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    {translations?.confirmPassword}
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...form.register("confirmPassword")}
                    error={form.formState.errors.confirmPassword?.message}
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending || registerMutation.isPending}
              >
                {(loginMutation.isPending || registerMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isLogin ? translations?.login : translations?.register}
              </Button>
            </form>

            <div className="text-center">
              <Button
                variant="link"
                onClick={() => {
                  setIsLogin(!isLogin);
                  form.reset();
                }}
                className="text-sm"
              >
                {isLogin
                  ? translations?.needAccount
                  : translations?.haveAccount}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:block bg-muted rounded-lg p-8"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                {translations?.welcomeTitle}
              </h2>
              <p className="text-muted-foreground">
                {translations?.welcomeDescription}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  {translations?.feature1}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  {translations?.feature2}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  {translations?.feature3}
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}