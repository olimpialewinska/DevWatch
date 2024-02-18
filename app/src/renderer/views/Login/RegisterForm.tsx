import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/renderer/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { UserRegister } from "@/renderer/types/User";
import React from "react";
import { Button } from "@/renderer/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
} from "@/renderer/components/ui/form";
import { Loader } from "lucide-react";
import { Input } from "@/renderer/components/ui/input";
import { UserApi } from "@/renderer/api/user";

const RegisterForm = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const formSchema = z.object({
    email: z
      .string({
        required_error: t("emailRequired"),
      })
      .email({
        message: t("invalidEmail"),
      }),
    password: z
      .string({
        required_error: t("fieldRequired"),
      })
      .min(8, { message: t("passwordTooShort") }),
    confirmPassword: z
      .string({
        required_error: t("fieldRequired"),
      })
      .min(8, { message: t("passwordTooShort") }),
    first_name: z.string().min(1, { message: t("fieldRequired") }),
    last_name: z.string().min(1, { message: t("fieldRequired") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: register, isPending: isRegisterLoading } = useMutation({
    mutationFn: (data: UserRegister) => UserApi.register(data),
    onSuccess: () => {
      toast({
        title: t("registerSuccess"),
        description: t("registerSuccessDescription"),
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: t("registerError"),
        description: t("registerErrorDescription"),
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: t("passwordMismatch"),
      });
      return;
    }
    register({
      password: values.password,
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
    });
  }

  return (
    <Form {...form}>
      <form
        data-test="register-form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
                <Input placeholder="user@example.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                {form.formState.errors.first_name ? (
                  <FormMessage />
                ) : (
                  <FormLabel>{t("firstName")}</FormLabel>
                )}
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                {form.formState.errors.last_name ? (
                  <FormMessage />
                ) : (
                  <FormLabel>{t("lastName")}</FormLabel>
                )}
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-3">
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
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-0 mt-0">
                {form.formState.errors.confirmPassword ? (
                  <FormMessage />
                ) : (
                  <FormLabel>{t("confirmPassword")}</FormLabel>
                )}
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">
          {isRegisterLoading ? <Loader size={24} /> : t("register")}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
