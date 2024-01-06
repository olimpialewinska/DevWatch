import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useToast } from "@/renderer/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { UserLogin } from "@/renderer/types/User";
import { UserApi } from "@/renderer/api/UserApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/renderer/components/ui/form";
import { Button } from "@/renderer/components/ui/button";
import { Loader } from "lucide-react";
import { Input } from "@/renderer/components/ui/input";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z
      .string({
        required_error: t("emailRequired"),
      })
      .email({
        message: t("invalidEmail"),
      }),
    password: z
      .string({ required_error: t("passwordRequired") })
      .min(8, { message: t("passwordTooShort") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: login, isPending: isLoginLoading } = useMutation({
    mutationFn: (data: UserLogin) => UserApi.login(data),
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: () => {
      toast({
        title: t("loginError"),
        description: t("loginErrorDescription"),
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values);
  }

  return (
    <Form {...form}>
      <form
        data-test="login-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {form.formState.errors.email ? (
                <FormMessage />
              ) : (
                <FormLabel>{t("email")}</FormLabel>
              )}
              <FormControl>
                <Input
                  placeholder="user@example.com"
                  {...field}
                  autoComplete="email"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              {form.formState.errors.password ? (
                <FormMessage />
              ) : (
                <FormLabel>{t("password")}</FormLabel>
              )}

              <FormControl>
                <Input
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">
          {isLoginLoading ? <Loader size={24} /> : t("login")}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
