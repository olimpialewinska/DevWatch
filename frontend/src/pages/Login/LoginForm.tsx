import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { UserApi } from "@/api/UserApi";
import { UserLogin } from "@/types/User";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/ui/loader";

const LoginForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

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

  const { mutateAsync: login, isLoading: isLoginLoading } = useMutation({
    mutationFn: (data: UserLogin) => UserApi.login(data),
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      toast({
        title: t("loginError"),
        description: t("loginErrorDescription"),
        variant: "default",
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
                <FormLabel>Email</FormLabel>
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
