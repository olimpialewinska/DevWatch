import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { UserApi } from "@/api/UserApi";
import { UserRegister } from "@/types/User";
import Loader from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";

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
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: register, isLoading: isRegisterLoading } = useMutation({
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
      first_name: "dsfdg",
      last_name: "fgdgdf",
    });
  }

  return (
    <Form {...form}>
      <form
        data-test="register-form"
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
                <Input placeholder="user@example.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
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
