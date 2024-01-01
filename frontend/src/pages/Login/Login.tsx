import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";
import LoginForm from "./LoginForm";
import { useTranslation } from "react-i18next";
import RegisterForm from "./RegisterForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const Login: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="h-[calc(100vh-56px)] flex justify-center items-center w-screen px-5">
      <Card className="w-[400px] transition-all ease-out">
        <Tabs defaultValue="login">
          <CardHeader>
            <TabsList className="flex">
              <TabsTrigger value="login" className="flex-1">
                {t("login")}
              </TabsTrigger>
              <TabsTrigger value="register" className="flex-1">
                {t("register")}
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </CardContent>
        </Tabs>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default Login;
